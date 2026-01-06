# Spec: Team Onboarding & Isolation

## ADDED Requirements

### Requirement: Team Namespace Enforcement

The system MUST assign a unique `team_name` to each onboarding group and strictly enforce this namespace in all configuration paths.

#### Scenario: Team can only use assigned prefix

- Given team "checkout" is onboarding
- When they create a location block
- Then the location path must start with `/api/checkout` or `/static/checkout`
- And any other path prefix triggers a validation error

#### Scenario: Route Collision Prevention

- Given team "checkout" claims `/api/checkout/cart`
- When team "payments" tries to claim `/api/checkout/wallet`
- Then the system recognizes the namespace violation and rejects the config instantly

### Requirement: Environment Segmentation

The system MUST support distinct configurations for Dev, UAT, and Prod for each team.

#### Scenario: Environment Isolation

- Given team "checkout" has a valid config in Dev
- When they want to deploy to Prod
- Then they must explicitly copy/promote the config to the Prod environment context
- And the Prod config must undergo its own independent validation
