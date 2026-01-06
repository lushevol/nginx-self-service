import { Test, type TestingModule } from '@nestjs/testing';
import { AzureDevOpsService } from './azure-devops.service';
// import * as azdev from 'azure-devops-node-api';

const mockGetItem = jest.fn();
const mockGetRefs = jest.fn();
const mockUpdateRefs = jest.fn();
const mockCreatePush = jest.fn();
const mockCreatePullRequest = jest.fn();

const mockGitApi = {
  getItem: mockGetItem,
  getRefs: mockGetRefs,
  updateRefs: mockUpdateRefs,
  createPush: mockCreatePush,
  createPullRequest: mockCreatePullRequest,
};

const mockGetGitApi = jest.fn().mockResolvedValue(mockGitApi);

const mockWebApi = {
  getGitApi: mockGetGitApi,
};

jest.mock('azure-devops-node-api', () => ({
  getPersonalAccessTokenHandler: jest.fn(),
  WebApi: jest.fn().mockImplementation(() => mockWebApi),
  VersionControlChangeType: { Edit: 1 },
  ItemContentType: { RawText: 1 },
}));

describe('AzureDevOpsService', () => {
  let service: AzureDevOpsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureDevOpsService],
    }).compile();

    service = module.get<AzureDevOpsService>(AzureDevOpsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getConfigs', () => {
    it('should return config content if found', async () => {
      mockGetItem.mockResolvedValue({ content: 'server { listen 80; }' });
      const result = await service.getConfigs('dev', 'teamA');
      expect(result).toBe('server { listen 80; }');
      expect(mockGetItem).toHaveBeenCalled();
    });

    it('should return fallback if config not found (throw error)', async () => {
      mockGetItem.mockRejectedValue(new Error('Item not found'));
      const result = await service.getConfigs('dev', 'teamA');
      expect(result).toContain('Config for teamA in dev');
      expect(result).toContain('upstream teamA_backend');
    });
  });

  describe('createPR', () => {
    it('should create a PR successfully', async () => {
      mockGetRefs.mockResolvedValue([{ objectId: 'base-commit-id' }]);
      mockCreatePullRequest.mockResolvedValue({ pullRequestId: 123 });

      const prId = await service.createPR('dev', 'teamA', 'new content');
      expect(prId).toBe('123');

      expect(mockGetRefs).toHaveBeenCalled(); // 1. Get Base
      expect(mockUpdateRefs).toHaveBeenCalled(); // 2. Create Branch
      expect(mockCreatePush).toHaveBeenCalled(); // 3. Push
      expect(mockCreatePullRequest).toHaveBeenCalled(); // 4. PR
    });

    it('should throw error if target branch not found', async () => {
      mockGetRefs.mockResolvedValue([]);
      await expect(service.createPR('dev', 'teamA', 'content')).rejects.toThrow(
        'Target branch refs/heads/dev not found',
      );
    });

    it('should throw error if updateRefs fails', async () => {
      mockGetRefs.mockResolvedValue([{ objectId: 'base-commit-id' }]);
      mockUpdateRefs.mockRejectedValue(new Error('Ref error'));
      await expect(service.createPR('dev', 'teamA', 'content')).rejects.toThrow(
        'Failed to create branch',
      );
    });
  });
});
