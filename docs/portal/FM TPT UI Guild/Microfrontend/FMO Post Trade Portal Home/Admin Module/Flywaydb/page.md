```
PGSL_RDB_SCHEMA: post_trade_portal_service

jasypt:
  encryptor:
    password: ${RATAN_CIPHER_KEY}

spring:
  ldap:
    urls: ${OUD_URL}
  datasource:
    url: ${PGSL_RDB_URL}
    username: ${PGSL_RDB_USERNAME_HASHICORP}
    password: ${PGSL_RDB_JANUS_HASHICORP}
    driverClassName: ${PGSL_RDB_DRIVER}
  flyway:
    enabled: true
    url: ${PGSL_RDB_URL}
    user: ${PGSL_RDB_USERNAME_HASHICORP}
    password: ${PGSL_RDB_JANUS_HASHICORP}
    baseline-on-migrate: true
    baseline-version: 0
    placeholder-replacement: false
    table: post_trade_portal_service_schema_history
```

```
CREATE SEQUENCE IF NOT EXISTS post_trade_portal_service.application_category_audit_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE SEQUENCE IF NOT EXISTS post_trade_portal_service.application_category_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE SEQUENCE IF NOT EXISTS post_trade_portal_service.application_tile_audit_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE SEQUENCE IF NOT EXISTS post_trade_portal_service.application_tile_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE SEQUENCE IF NOT EXISTS post_trade_portal_service.import_map_audit_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE SEQUENCE IF NOT EXISTS post_trade_portal_service.import_map_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;



CREATE TABLE IF NOT EXISTS post_trade_portal_service.import_map
(
    is_active boolean NOT NULL,
    created_at timestamp(6) without time zone,
    import_map_id bigint NOT NULL,
    updated_at timestamp(6) without time zone,
    created_by character varying(255) COLLATE pg_catalog."default",
    ems2_role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    key_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    path character varying(255) COLLATE pg_catalog."default" NOT NULL,
    updated_by character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT import_map_pkey PRIMARY KEY (import_map_id),
    CONSTRAINT import_map_key_name_key UNIQUE (key_name)
)
TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS post_trade_portal_service.import_map_audit
(
    is_active boolean NOT NULL,
    created_at timestamp(6) without time zone,
    import_map_audit_id bigint NOT NULL,
    import_map_id bigint NOT NULL,
    updated_at timestamp(6) without time zone,
    created_by character varying(255) COLLATE pg_catalog."default",
    ems2_role character varying(255) COLLATE pg_catalog."default",
    key_name character varying(255) COLLATE pg_catalog."default",
    path character varying(255) COLLATE pg_catalog."default",
    transaction_mode character varying(255) COLLATE pg_catalog."default",
    updated_by character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT import_map_audit_pkey PRIMARY KEY (import_map_audit_id)
)
TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS import_map_audit_s_idx
ON post_trade_portal_service.import_map_audit USING btree (import_map_id, updated_at)
TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS post_trade_portal_service.application_category
(
    is_active boolean NOT NULL,
    application_category_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    created_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    ems2_role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    label character varying(255) COLLATE pg_catalog."default" NOT NULL,
    updated_by character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT application_category_pkey PRIMARY KEY (application_category_id),
    CONSTRAINT application_category_label_key UNIQUE (label)
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS post_trade_portal_service.application_category_audit
(
    is_active boolean NOT NULL,
    application_category_audit_id bigint NOT NULL,
    application_category_id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    updated_at timestamp(6) without time zone,
    created_by character varying(255) COLLATE pg_catalog."default",
    ems2_role character varying(255) COLLATE pg_catalog."default",
    label character varying(255) COLLATE pg_catalog."default",
    transaction_mode character varying(255) COLLATE pg_catalog."default",
    updated_by character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT application_category_audit_pkey PRIMARY KEY (application_category_audit_id)
)
TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS application_category_audit_s_idx
ON post_trade_portal_service.application_category_audit USING btree (application_category_id, updated_at)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS post_trade_portal_service.application_tile
(
    is_active boolean NOT NULL,
    is_template boolean NOT NULL,
    application_category_id bigint,
    application_tile_id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    import_map_id bigint,
    updated_at timestamp(6) without time zone,
    ems2_entities character varying(32000) COLLATE pg_catalog."default" NOT NULL,
    created_by character varying(255) COLLATE pg_catalog."default",
    email_support character varying(255) COLLATE pg_catalog."default",
    ems2_role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    ems2_subject character varying(255) COLLATE pg_catalog."default" NOT NULL,
    image_dark_theme character varying(255) COLLATE pg_catalog."default",
    image_light_theme character varying(255) COLLATE pg_catalog."default",
    module character varying(255) COLLATE pg_catalog."default" NOT NULL,
    subtitle character varying(255) COLLATE pg_catalog."default",
    tile character varying(255) COLLATE pg_catalog."default" NOT NULL,
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    updated_by character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT application_tile_pkey PRIMARY KEY (application_tile_id),
    CONSTRAINT fkoiqx1urybxjewspq831fuooro FOREIGN KEY (application_category_id)
        REFERENCES post_trade_portal_service.application_category (application_category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkpoogfscu1hsh341s1p4f2vlac FOREIGN KEY (import_map_id)
        REFERENCES post_trade_portal_service.import_map (import_map_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS post_trade_portal_service.application_tile_audit
(
    is_active boolean NOT NULL,
    is_template boolean NOT NULL,
    application_category_id bigint,
    application_tile_audit_id bigint NOT NULL,
    application_tile_id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    import_map_id bigint,
    updated_at timestamp(6) without time zone,
    ems2_entities character varying(32000) COLLATE pg_catalog."default",
    created_by character varying(255) COLLATE pg_catalog."default",
    email_support character varying(255) COLLATE pg_catalog."default",
    ems2_role character varying(255) COLLATE pg_catalog."default",
    ems2_subject character varying(255) COLLATE pg_catalog."default",
    image_dark_theme character varying(255) COLLATE pg_catalog."default",
    image_light_theme character varying(255) COLLATE pg_catalog."default",
    module character varying(255) COLLATE pg_catalog."default",
    subtitle character varying(255) COLLATE pg_catalog."default",
    tile character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default",
    transaction_mode character varying(255) COLLATE pg_catalog."default",
    updated_by character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT application_tile_audit_pkey PRIMARY KEY (application_tile_audit_id),
    CONSTRAINT fkf3b5hokegoi8i7er48jfpsfs0 FOREIGN KEY (application_category_id)
        REFERENCES post_trade_portal_service.application_category (application_category_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fkkkuhv88d3954clacpmrkl29fm FOREIGN KEY (import_map_id)
        REFERENCES post_trade_portal_service.import_map (import_map_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS application_tile_audit_s_idx
ON post_trade_portal_service.application_tile_audit USING btree (application_tile_id, updated_at)
TABLESPACE pg_default;

-- grant privileges to ratanone_dmp

GRANT USAGE ON SCHEMA post_trade_portal_service TO ratanone_dmp;
GRANT SELECT ON ALL TABLES IN SCHEMA post_trade_portal_service TO ratanone_dmp;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA post_trade_portal_service TO ratanone_dmp;

ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT SELECT ON TABLES TO ratanone_dmp;
ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT SELECT ON SEQUENCES TO ratanone_dmp;

-- grant privileges to ratanprd_002

GRANT USAGE ON SCHEMA post_trade_portal_service TO ratanprd_002;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA post_trade_portal_service TO ratanprd_002;
GRANT SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA post_trade_portal_service TO ratanprd_002;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA post_trade_portal_service TO ratanprd_002;

ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT SELECT,INSERT,UPDATE,DELETE,TRUNCATE ON TABLES TO ratanprd_002;
ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT SELECT,UPDATE ON SEQUENCES TO ratanprd_002;
ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT EXECUTE ON FUNCTIONS  TO ratanprd_002;

-- grant privileges to psssupport

GRANT USAGE ON SCHEMA post_trade_portal_service TO psssupport;
GRANT SELECT ON ALL TABLES IN SCHEMA post_trade_portal_service TO psssupport;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA post_trade_portal_service TO psssupport;

ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT SELECT ON TABLES TO psssupport;
ALTER DEFAULT PRIVILEGES IN SCHEMA post_trade_portal_service GRANT SELECT ON SEQUENCES TO psssupport;
```

```
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 1, '2024-12-11 17:27:50.652', '2024-12-11 17:27:50.652', '2001208', 'SUPER_USER', 'Admin Module', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 2, '2024-12-11 17:27:50.652', '2024-12-11 17:27:50.652', '2001208', 'SUPER_USER', 'Template', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 3, '2024-12-11 17:27:58.016', '2024-12-11 17:27:58.016', '2001208', 'CDUPS_ADMIN', 'Confirmations', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 4, '2024-12-11 17:28:02.81', '2024-12-11 17:28:02.81', '2001208', 'RATAN_ADMIN', 'Exception Management', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 5, '2024-12-11 17:28:08.597', '2024-12-11 17:28:08.597', '2001208', 'FSS_ADMIN', 'FSS SERVICES', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 6, '2024-12-11 17:28:13.583', '2024-12-11 17:28:13.583', '2001208', 'LOANIQ_ADMIN', 'LoanIQ', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 7, '2024-12-11 17:28:14.978', '2024-12-11 17:28:14.978', '2001208', 'RATAN_ADMIN', 'M7 Platform', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 8, '2024-12-11 17:28:16.403', '2024-12-11 17:28:16.403', '2001208', 'RATAN_ADMIN', 'Business Rule', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 9, '2024-12-11 17:28:19.925', '2024-12-11 17:28:19.925', '2001208', 'RATAN_ADMIN', 'Settlement', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 10, '2024-12-11 17:28:23.413', '2024-12-11 17:28:23.413', '2001208', 'SSDR_ADMIN', 'SSDR', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 11, '2024-12-11 17:28:26.443', '2024-12-11 17:28:26.443', '2001208', 'SSI_ADMIN', 'SSI plus', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 12, '2024-12-11 17:28:30.159', '2024-12-11 17:28:30.159', '2001208', 'STAMP_ADMIN', 'Static Data Mapping', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 13, '2024-12-11 17:28:31.92', '2024-12-11 17:28:31.92', '2001208', 'RATAN_ADMIN', 'Static', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 14, '2024-12-11 17:28:34.879', '2024-12-11 17:28:34.879', '2001208', ' SSTM_ADMIN', 'SSTM', '2001208');
INSERT INTO post_trade_portal_service.application_category (is_active, application_category_id, created_at, updated_at, created_by, ems2_role, label, updated_by) VALUES (true, 15, '2024-12-11 17:28:36.293', '2024-12-11 17:28:36.293', '2001208', 'RATAN_ADMIN', 'Trade Processing', '2001208');

SELECT setval('post_trade_portal_service.application_category_seq', (select max(application_category_id)+10 from post_trade_portal_service.application_category), true);

INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 1, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'single-spa', '/js/external/single-spa.dev.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 2, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'react', '/js/external/react.development.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 3, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'react-dom', '/js/external/react-dom.development.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 4, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'root-config', '/config.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 5, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'base', '/base/base.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 6, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'template', '/template/template.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:47.738', 7, '2024-12-11 17:27:47.738', '2001208', 'SUPER_USER', 'template_container', '/template_container/template_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 10, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_container', '/ratan_container/ratan_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 11, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_cashflow', '/ratan_cashflow/ratan_cashflow.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 12, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_trades', '/ratan_trade/ratan_trades.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 13, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_exception', '/ratan_exception/ratan_exception.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 14, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_rules', '/ratan_rules/ratan_rules.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 15, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_authorization_limits', '/ratan_authorization_limits/ratan_authorization_limits.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 16, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_cashflow_blotter', '/ratan_cashflow_blotter/ratan_cashflow_blotter.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:27:59.789', 17, '2024-12-11 17:27:59.789', '2001208', 'RATAN_ADMIN', 'ratan_nostro_static', '/ratan_nostro_static/ratan_nostro_static.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 18, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'mfe_fssservices_container', '/mfe_fssservices_container/mfe_fssservices_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 19, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'mfe_fssservices_tiles', '/mfe_fssservices_tiles/mfe_fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 20, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'mfe_fssservices_peregrine_container', '/mfe_fssservices_peregrine_container/mfe_fssservices_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 21, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'mfe_fssservices_peregrine_tiles', '/mfe_fssservices_peregrine_tiles/mfe_fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 22, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'mfe_fssservices_bap_container', '/mfe_fssservices_bap_container/mfe_fssservices_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 23, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'mfe_fssservices_bap_tiles', '/mfe_fssservices_bap_tiles/mfe_fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 24, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'fssservices_container', '/fssservices_container/fssservices_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 25, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'fss_feeaccrual_reference', '/fss_feeaccrual_reference/fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 26, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'fss_feeaccrual_transaction', '/fss_feeaccrual_transaction/fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 36, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'fss_rules_management', '/fss_rules_management/fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 37, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'fss_payments_reference', '/fss_payments_reference/fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:05.256', 38, '2024-12-11 17:28:05.256', '2001208', 'FSS_ADMIN', 'fss_payments_transaction', '/fss_payments_transaction/fssservices_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:13.046', 27, '2024-12-11 17:28:13.046', '2001208', 'LOANIQ_ADMIN', 'loanIq_container', '/loanIq_container/loanIq_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:22.501', 28, '2024-12-11 17:28:22.501', '2001208', 'SSDR_ADMIN', 'ssdr_container', '/ssdr_container/ssdr_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:22.502', 29, '2024-12-11 17:28:22.502', '2001208', 'SSDR_ADMIN', 'ssdr_tiles', '/ssdr_tiles/ssdr_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:25.559', 30, '2024-12-11 17:28:25.559', '2001208', 'SSI_ADMIN', 'ssi_container', '/ssi_container/ssi_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:25.559', 31, '2024-12-11 17:28:25.559', '2001208', 'SSI_ADMIN', 'ssi_tiles', '/ssi_tiles/ssi_tiles.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:29.269', 32, '2024-12-11 17:28:29.269', '2001208', 'STAMP_ADMIN', 'stamp_container', '/stamp_container/stamp_container.js', '2001208');
INSERT INTO post_trade_portal_service.import_map (is_active, created_at, import_map_id, updated_at, created_by, ems2_role, key_name, path, updated_by) VALUES (true, '2024-12-11 17:28:29.269', 33, '2024-12-11 17:28:29.269', '2001208', 'STAMP_ADMIN', 'stamp_tiles', '/stamp_tiles/stamp_tiles.js', '2001208');


SELECT setval('post_trade_portal_service.import_map_seq', (select max(import_map_id)+10 from post_trade_portal_service.import_map), true);

INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 1, 1, '2024-12-11 17:27:52.195', 5, '2024-12-11 17:27:52.195', 'FMO PORTAL ADMIN', '2001208', '', 'SUPER_USER', '/importmap', 'darkIcons/icon12.svg', 'lightIcons/icon12.svg', 'importmap', '', 'importmap', 'Module Map', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 1, 2, '2024-12-11 17:27:52.195', 5, '2024-12-11 17:27:52.195', 'FMO PORTAL ADMIN', '2001208', '', 'SUPER_USER', '/category', 'darkIcons/icon13.svg', 'lightIcons/icon13.svg', 'category', '', 'category', 'Drawer Category', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 1, 3, '2024-12-11 17:27:52.195', 5, '2024-12-11 17:27:52.195', 'FMO PORTAL ADMIN', '2001208', '', 'SUPER_USER', '/tile', 'darkIcons/icon14.svg', 'lightIcons/icon14.svg', 'tile', '', 'tile', 'Tile Configuration', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 4, 15, '2024-12-11 17:28:03.693', 10, '2024-12-11 17:28:03.693', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_VALIDATION_EXCEPTION', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'exceptions_blotter', '', 'validation', 'Validation Exceptions', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 4, 16, '2024-12-11 17:28:03.693', 10, '2024-12-11 17:28:03.693', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SETTLEMENT_EXCEPTION', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'exceptions_blotter', '', 'settlement', 'Settlement Exceptions', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 4, 17, '2024-12-11 17:28:03.693', 10, '2024-12-11 17:28:03.693', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_MO_EXCEPTION', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'exceptions_blotter', '', 'middle_office', 'MO Exceptions', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 4, 18, '2024-12-11 17:28:03.693', 10, '2024-12-11 17:28:03.693', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SETTLEMENT_EXCEPTION', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'exceptions_blotter', '', 'iso_exception', 'ISO Exceptions', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 19, '2024-12-11 17:28:10.036', 18, '2024-12-11 17:28:10.036', 'FSS_PAYMENTS_SERVICES_TH, FSS_PAYMENTS_SERVICES_SG', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Payments Services', 'darkIcons/icon10.svg', 'lightIcons/icon10.svg', 'mfe_fssservices_tiles', '', 'tile1', 'Payment Processing', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 20, '2024-12-11 17:28:10.037', 24, '2024-12-11 17:28:10.037', 'FSSPS_ETF_CN, FSSPS_FSPAYMENT_ID', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Services Payments Core', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'fss_payments_transaction', '', 'payments-transaction', 'Payments - Transaction', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 21, '2024-12-11 17:28:10.037', 24, '2024-12-11 17:28:10.037', 'FSSPS_REFERENCE_CN, FSSPS_REFERENCE_ID', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Services Payments Reference', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'fss_payments_reference', '', 'payments-reference', 'Payments - Reference', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 22, '2024-12-11 17:28:10.037', 20, '2024-12-11 17:28:10.037', 'FSS_SERVICES_PEREGRINE,FSS_SERVICES_PEREGRINE_AE,FSS_SERVICES_PEREGRINE_HK,FSS_SERVICES_PEREGRINE_LU', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Services Peregrine', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'mfe_fssservices_peregrine_tiles', '', 'peregrine', 'FSS Services – DAC', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 23, '2024-12-11 17:28:10.037', 22, '2024-12-11 17:28:10.037', 'FSS_BAP_AE_GROUPS, FSS_BAP_AE_GROUPS_FUNDS, FSS_BAP_AE_OPERATIONS, FSS_BAP_AE_PRODUCT, FSS_BAP_AE_REGIONAL, FSS_BAP_AE_SALES, FSS_BAP_BD_GROUPS, FSS_BAP_BD_GROUPS_FUNDS, FSS_BAP_BD_OPERATIONS, FSS_BAP_BD_PRODUCT, FSS_BAP_BD_REGIONAL, FSS_BAP_BD_SALES, FSS_BAP_BH_GROUPS, FSS_BAP_BH_GROUPS_FUNDS, FSS_BAP_BH_OPERATIONS, FSS_BAP_BH_PRODUCT, FSS_BAP_BH_SALES, FSS_BAP_BH_REGIONAL, FSS_BAP_BW_GROUPS, FSS_BAP_BW_GROUPS_FUNDS, FSS_BAP_BW_OPERATIONS, FSS_BAP_BW_PRODUCT, FSS_BAP_BW_REGIONAL, FSS_BAP_BW_SALES, FSS_BAP_CENTRAL_PRICING_TEAM, FSS_BAP_CI_GROUPS, FSS_BAP_CI_GROUPS_FUNDS, FSS_BAP_CI_OPERATIONS, FSS_BAP_CI_PRODUCT, FSS_BAP_CI_REGIONAL, FSS_BAP_CI_SALES, FSS_BAP_CN_GROUPS, FSS_BAP_CN_GROUPS_FUNDS, FSS_BAP_CN_OPERATIONS, FSS_BAP_CN_PRODUCT, FSS_BAP_CN_REGIONAL, FSS_BAP_CN_SALES, FSS_BAP_DEAL_EXTRACT, FSS_BAP_EG_GROUPS, FSS_BAP_EG_GROUPS_FUNDS, FSS_BAP_EG_OPERATIONS, FSS_BAP_EG_PRODUCT, FSS_BAP_EG_REGIONAL, FSS_BAP_EG_SALES, FSS_BAP_FEE_APPROVAL, FSS_BAP_FEE_CHANGE, FSS_BAP_GH_GROUPS, FSS_BAP_GH_GROUPS_FUNDS, FSS_BAP_GH_OPERATIONS, FSS_BAP_GH_PRODUCT, FSS_BAP_GH_REGIONAL, FSS_BAP_GH_SALES, FSS_BAP_HK_GROUPS, FSS_BAP_HK_GROUPS_FUNDS, FSS_BAP_HK_OPERATIONS, FSS_BAP_HK_PRODUCT, FSS_BAP_HK_REGIONAL, FSS_BAP_HK_SALES, FSS_BAP_ID_GROUPS, FSS_BAP_ID_GROUPS_FUNDS, FSS_BAP_ID_OPERATIONS, FSS_BAP_ID_PRODUCT, FSS_BAP_ID_REGIONAL, FSS_BAP_ID_SALES, FSS_BAP_IN_GROUPS_FUNDS, FSS_BAP_IN_SALES, FSS_BAP_IN_OPERATIONS, FSS_BAP_IN_PRODUCT, FSS_BAP_IN_REGIONAL, FSS_BAP_IN_GROUPS, FSS_BAP_JP_GROUPS, FSS_BAP_JP_GROUPS_FUNDS, FSS_BAP_JP_OPERATIONS, FSS_BAP_JP_PRODUCT, FSS_BAP_JP_REGIONAL, FSS_BAP_JP_SALES, FSS_BAP_KE_GROUPS, FSS_BAP_KE_GROUPS_FUNDS, FSS_BAP_KE_OPERATIONS, FSS_BAP_KE_PRODUCT, FSS_BAP_KE_REGIONAL, FSS_BAP_KE_SALES, FSS_BAP_LK_GROUPS, FSS_BAP_LK_GROUPS_FUNDS, FSS_BAP_LK_OPERATIONS, FSS_BAP_LK_PRODUCT, FSS_BAP_LK_REGIONAL, FSS_BAP_LK_SALES, FSS_BAP_MU_GROUPS, FSS_BAP_MU_GROUPS_FUNDS, FSS_BAP_MU_OPERATIONS, FSS_BAP_MU_PRODUCT, FSS_BAP_MU_REGIONAL, FSS_BAP_MU_SALES, FSS_BAP_NG_GROUPS, FSS_BAP_NG_GROUPS_FUNDS, FSS_BAP_NG_OPERATIONS, FSS_BAP_NG_PRODUCT, FSS_BAP_NG_REGIONAL, FSS_BAP_NG_SALES, FSS_BAP_OM_GROUPS, FSS_BAP_OM_GROUPS_FUNDS, FSS_BAP_OM_OPERATIONS, FSS_BAP_OM_PRODUCT, FSS_BAP_OM_REGIONAL, FSS_BAP_OM_SALES, FSS_BAP_PH_GROUPS, FSS_BAP_PH_GROUPS_FUNDS, FSS_BAP_PH_OPERATIONS, FSS_BAP_PH_PRODUCT, FSS_BAP_PH_REGIONAL, FSS_BAP_PH_SALES, FSS_BAP_QA_GROUPS, FSS_BAP_QA_GROUPS_FUNDS, FSS_BAP_QA_OPERATIONS, FSS_BAP_QA_PRODUCT, FSS_BAP_QA_REGIONAL, FSS_BAP_QA_SALES, FSS_BAP_SA_GROUPS, FSS_BAP_SA_GROUPS_FUNDS, FSS_BAP_SA_OPERATIONS, FSS_BAP_SA_PRODUCT, FSS_BAP_SA_REGIONAL, FSS_BAP_SA_SALES, FSS_BAP_SG_GROUPS, FSS_BAP_SG_GROUPS_FUNDS, FSS_BAP_SG_OPERATIONS, FSS_BAP_SG_PRODUCT, FSS_BAP_SG_REGIONAL, FSS_BAP_SG_SALES, FSS_BAP_TH_GROUPS, FSS_BAP_TH_GROUPS_FUNDS, FSS_BAP_TH_OPERATIONS, FSS_BAP_TH_PRODUCT, FSS_BAP_TH_REGIONAL, FSS_BAP_TH_SALES, FSS_BAP_TW_GROUPS, FSS_BAP_TW_GROUPS_FUNDS, FSS_BAP_TW_OPERATIONS, FSS_BAP_TW_PRODUCT, FSS_BAP_TW_REGIONAL, FSS_BAP_TW_SALES, FSS_BAP_TZ_GROUPS, FSS_BAP_TZ_GROUPS_FUNDS, FSS_BAP_TZ_OPERATIONS, FSS_BAP_TZ_PRODUCT, FSS_BAP_TZ_REGIONAL, FSS_BAP_TZ_SALES, FSS_BAP_UG_GROUPS, FSS_BAP_UG_GROUPS_FUNDS, FSS_BAP_UG_OPERATIONS, FSS_BAP_UG_PRODUCT, FSS_BAP_UG_REGIONAL, FSS_BAP_UG_SALES, FSS_BAP_UK_GROUPS, FSS_BAP_UK_GROUPS_FUNDS, FSS_BAP_UK_OPERATIONS, FSS_BAP_UK_PRODUCT, FSS_BAP_UK_REGIONAL, FSS_BAP_UK_SALES, FSS_BAP_US_GROUPS, FSS_BAP_US_GROUPS_FUNDS, FSS_BAP_US_OPERATIONS, FSS_BAP_US_PRODUCT, FSS_BAP_US_SALES, FSS_BAP_VN_GROUPS, FSS_BAP_VN_GROUPS_FUNDS, FSS_BAP_VN_OPERATIONS, FSS_BAP_VN_PRODUCT, FSS_BAP_VN_REGIONAL, FSS_BAP_VN_SALES, FSS_BAP_ZA_GROUPS, FSS_BAP_ZA_GROUPS_FUNDS, FSS_BAP_ZA_OPERATIONS, FSS_BAP_ZA_PRODUCT, FSS_BAP_ZA_REGIONAL, FSS_BAP_ZA_SALES, FSS_BAP_ZM_GROUPS, FSS_BAP_ZM_GROUPS_FUNDS, FSS_BAP_ZM_OPERATIONS, FSS_BAP_ZM_PRODUCT, FSS_BAP_ZM_REGIONAL, FSS_BAP_ZM_SALES, FSS_BAP_ZW_GROUPS, FSS_BAP_ZW_GROUPS_FUNDS, FSS_BAP_ZW_OPERATIONS, FSS_BAP_ZW_PRODUCT, FSS_BAP_ZW_REGIONAL, FSS_BAP_ZW_SALES', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Business Acceptance Portal', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'mfe_fssservices_bap_tiles', '', 'bap', 'BAP Digitization', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 24, '2024-12-11 17:28:10.037', 24, '2024-12-11 17:28:10.037', 'FSSFA_REFERENCE_ID, FSSFA_REFERENCE_MY, FSSFA_REFERENCE_PH, FSSFA_REFERENCE_SG, FSSFA_REFERENCE_TH, FSSFA_REFERENCE_VN, FSSFA_REFERENCE_HK', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Fee Accrual Reference', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'fss_feeaccrual_reference', '', 'fa-reference', 'FA - Reference', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 25, '2024-12-11 17:28:10.037', 24, '2024-12-11 17:28:10.037', 'FSSFA_CORE_ID, FSSFA_CORE_MY, FSSFA_CORE_PH, FSSFA_CORE_SG, FSSFA_CORE_TH, FSSFA_CORE_VN, FSSFA_CORE_HK', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Fee Accrual Core', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'fss_feeaccrual_transaction', '', 'fa-transaction', 'FA - Transaction', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 5, 26, '2024-12-11 17:28:10.037', 24, '2024-12-11 17:28:10.037', 'FSSPS_COE_ETF_CN, FSSPS_COE_FSPAYMENT_ID', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'FSS_ADMIN', 'FSS Services Payments COE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'fss_rules_management', '', 'fssrules', 'FSS Rules Management', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 7, 28, '2024-12-11 17:28:15.863', 10, '2024-12-11 17:28:15.863', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_MO_EXCEPTION', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'exceptions_blotter', '', 'm7_platform_security_treats', 'Security Threats', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 29, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_PROFILE_LIMITS', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'cashflow_blotter_cn', '', 'cashflow_authorization_limits', 'Authorization Limits', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 30, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SETTLEMENT_STP_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', 'New', 'new_nstp_rules', 'Settlement NSTP Rules', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 31, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SETTLEMENT_STP_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', '[FX & Equity]', 'settlement_nstp_rules', 'Settlement NSTP Rules', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 32, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SUPPRESSION_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', '', 'suppression_rules', 'Suppression Rules', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 33, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SUPPRESSION_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', '[Swift]', 'swift_suppression_rules', 'Suppression Rules', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 34, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_SUPPRESSION_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', '[Cashflow]', 'cashflow_suppression_rules', 'Suppression Rules', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 8, 35, '2024-12-11 17:28:17.268', 10, '2024-12-11 17:28:17.268', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_MO_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', '', 'mo_rules', 'MO Rules', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 9, 36, '2024-12-11 17:28:20.837', 10, '2024-12-11 17:28:20.837', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_CASHFLOW_BLOTTER', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'cashflow_blotter', '[FX & Equity]', 'cashflow_bau', 'Cashflow Blotter', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 9, 37, '2024-12-11 17:28:20.837', 10, '2024-12-11 17:28:20.837', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_STRATEGIC_CASHFLOW_BLOTTER', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'cashflow_blotter_cn', '', 'cashflow_cn', 'Cashflow Blotter', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 9, 38, '2024-12-11 17:28:20.837', 10, '2024-12-11 17:28:20.837', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_CASHFLOW_GROUP_BLOTTER', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'cashflow_blotter_cn', '', 'cashflow_group_management', 'Grouping Blotter', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 9, 39, '2024-12-11 17:28:20.837', 10, '2024-12-11 17:28:20.837', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_STRATEGIC_CASHFLOW_BLOTTER', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'cashflow_blotter_cn', '', 'cashflow_cn_dashboard', 'Cashflow Dashboard', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 11, 43, '2024-12-11 17:28:27.338', 30, '2024-12-11 17:28:27.338', 'SSIPLUS', '2001208', 'FM-TPT-JavaX-Studio@exchange.standardchartered.com', 'SSI_ADMIN', 'SEARCH', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'ssi', '', 'search', 'SSI', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 11, 44, '2024-12-11 17:28:27.338', 30, '2024-12-11 17:28:27.338', 'SSIPLUS', '2001208', 'FM-TPT-JavaX-Studio@exchange.standardchartered.com', 'SSI_ADMIN', 'STATIC', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'ssi', '', 'static', 'Static', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 11, 45, '2024-12-11 17:28:27.338', 30, '2024-12-11 17:28:27.338', 'SSIPLUS', '2001208', 'FM-TPT-JavaX-Studio@exchange.standardchartered.com', 'SSI_ADMIN', 'VALIDATIONRULES', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'ssi', '', 'validationrules', 'Validation rules and Market filter set', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 11, 46, '2024-12-11 17:28:27.338', 30, '2024-12-11 17:28:27.338', 'SSIPLUS', '2001208', 'FM-TPT-JavaX-Studio@exchange.standardchartered.com', 'SSI_ADMIN', 'WORKQUEUE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'ssi', '', 'queues', 'Work Queues', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 11, 47, '2024-12-11 17:28:27.338', 30, '2024-12-11 17:28:27.338', 'SSIPLUS', '2001208', 'FM-TPT-JavaX-Studio@exchange.standardchartered.com', 'SSI_ADMIN', 'IMPORTEXPORT', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'ssi', '', 'import_export', 'Import/Export', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 12, 48, '2024-12-11 17:28:31.043', 32, '2024-12-11 17:28:31.043', 'STAMP_STATIC', '2001208', 'MLS_BAU@sc.com', 'STAMP_ADMIN', 'Mapping Query', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'stamp', '', 'stamp-mappingquery', 'Mapping Query', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 12, 49, '2024-12-11 17:28:31.043', 32, '2024-12-11 17:28:31.043', 'STAMP_STATIC', '2001208', 'MLS_BAU@sc.com', 'STAMP_ADMIN', 'Audit', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'stamp', '', 'stamp-audit', 'Audit', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 13, 50, '2024-12-11 17:28:32.8', 10, '2024-12-11 17:28:32.8', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_NETTING_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'rules_blotter', '', 'new_netting_rules', 'Netting Static', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 13, 51, '2024-12-11 17:28:32.8', 10, '2024-12-11 17:28:32.8', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_NOSTRO_BLOTTER', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'nostro_static_container', '', 'nostro_static', 'Nostro Static', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 13, 52, '2024-12-11 17:28:32.8', 10, '2024-12-11 17:28:32.8', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_NETTING_RULE', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'cashflow_blotter_cn', '', 'cashflow_bic_netting_static_table', 'BIC Netting Static', '2001208');
INSERT INTO post_trade_portal_service.application_tile (is_active, is_template, application_category_id, application_tile_id, created_at, import_map_id, updated_at, ems2_entities, created_by, email_support, ems2_role, ems2_subject, image_dark_theme, image_light_theme, module, subtitle, tile, title, updated_by) VALUES (true, false, 15, 54, '2024-12-11 17:28:37.19', 10, '2024-12-11 17:28:37.19', 'X_RATANONE', '2001208', 'FM_BPMS.SUPPORT@sc.com', 'RATAN_ADMIN', 'RATAN_TRADE_BLOTTER', 'darkIcons/icon11.svg', 'lightIcons/icon11.svg', 'trade_blotter', '', 'trade', 'Trade Blotter', '2001208');


SELECT setval('post_trade_portal_service.application_tile_seq', (select max(application_tile_id)+10 from post_trade_portal_service.application_tile), true);



```
