topic_tbl

| code | description | container | module | tile | enabled | graphql_endpoint | subscription_payload |
| --- | --- | --- | --- | --- | --- | --- | --- |
| trade_record_created | | RatanContainer | /trade_blotter | /trade | true | wss://g1.sc.com/graphql | subscription{....} |
| trade_status_updated | | RatanContainer | /trade_blotter | /trade | true | [wss://g1.sc.com/graphql](wss://g1.sc.com/graphql) | subscription{....} |
| trade_booking_entity_updated | | RatanContainer | /trade_blotter | /trade | true | [wss://g1.sc.com/graphql](wss://g1.sc.com/graphql) | subscription{....} |

user_topic_tbl

| user_id | topic_code | enabled | muted |
| --- | --- | --- | --- |
| 1243644 | trade_record_created | true | true |
| 1243644 | trade_status_updated | true | false |
| 1243644 | trade_booking_entity_updated | true | false |
| 1471104 | trade_record_created | true | false |

notification_tbl

note: we can retrain  last 1 hour, or 6 hours, or 24 hours data only.

| notification_id | topic_code | message | payload |
| --- | --- | --- | --- |
| 1 | trade_record_created | New trade#122342343 created ..... | {"trade_id": 122342343} |
| 2 | trade_status_updated | Trade#1223423439 status is updated | {"trade_id": 1223423439} |
| | | | |

user_notification_tbl

note: we can retrain  last 1 hour, or 6 hours, or 24 hours data only for every users.

| user_id | notification_id | isRead | isShown |
| --- | --- | --- | --- |
| 1243644 | 1 | false | true |
| 1471104 | 1 | false | true |
| 1243644 | 2 | false | true |
