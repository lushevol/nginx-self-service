## Finding:

![image2023-11-22_9-16-14.png](attachments/image2023-11-22_9-16-14.png)

| Ref | Rating | Title | Status |
| --- | --- | --- | --- |
| 4.2 | 5.3 | Medium: Improper Access Control – Unauthorized Access To Data | ### **** |
| 4.3 | 4.8 | Medium: Lack of Protection Against Reverse Brute Force Attacks | ### **Consider Fixed.** **It will not happen in Production. We have removed the normal login.** |
| 4.7 | 3.1 | Low: Information Exposure Through an Error Message | ### **** |
| 4.8 | 3.1 | Low: GraphQL Introspection Enabled | ### **** |
| 4.9 | 3.1 | Low: Misconfigured HTTP Security Headers | ### **** |
| 4.10 | 3.1 | Low: TLS Issues – Weak Cipher Suites Supported | ### **** |
| 4.11 | 2.9 | Low: No Session Invalidation After Logout | ### **** |
| 4.12 | 2.5 | Low: Redundant Data in Local Storage | ### **** |
| 4.13 | 0.0 | None: Cross-Origin Resource Sharing – Arbitrary Origin Trusted | ### **** |

## Status:

### 4.2 => 5.3 Medium: Improper Access Control – Unauthorized Access To Data ****

**![image2023-12-6_16-58-13.png](attachments/image2023-12-6_16-58-13.png)**

### 4.3 => 4.8 Medium: Lack of Protection Against Reverse Brute Force Attacks ****

We are using OUD/LDAP for authentication purpose.

In non production, there are many user with the same default password. => So it is easy guess the password.

**It will not happen in Production. We have removed the normal login in Production.**

### 4.7 => 3.1 Low: Information Exposure Through an Error Message ****

**![image2023-12-6_16-56-29.png](attachments/image2023-12-6_16-56-29.png)**

### **4.8 => 3.1 Low: GraphQL Introspection Enabled **

![image2023-12-5_9-57-1.png](attachments/image2023-12-5_9-57-1.png)

### **4.9 => 3.1 Low: Misconfigured HTTP Security Headers **

![image2023-12-13_12-0-21.png](attachments/image2023-12-13_12-0-21.png)

### **4.10 => 3.1 Low: TLS Issues – Weak Cipher Suites Supported **

**![image2023-12-5_10-3-26.png](attachments/image2023-12-5_10-3-26.png)**

### 4.11 => 2.9 Low: No Session Invalidation After Logout ****

We have put the session id in Black List Session.

![image2023-12-5_10-12-9.png](attachments/image2023-12-5_10-12-9.png)

So no can use this JWT:

Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJlbnRpdGxlbWVudHMiOiJ7XCJGU1NfUEFZTUVOVFNfU0VSVklDRVNfVEg6RlNTX1BTX1NVUEVSX1VTRVJcIjp7XCJGU1MgUGF5bWVudHMgU2VydmljZXNcIjpbXCJDT1VOVFJZX1RIXCJdfSxcIlNTSVBMVVM6U1NJX1NVUEVSX1VTRVJcIjp7XCJJTVBPUlRFWFBPUlRcIjpbXCJXUklURVwiXSxcIlNFQVJDSFwiOltcIldSSVRFXCJdLFwiV09SS1FVRVVFXCI6W1wiV1JJVEVcIl0sXCJWQUxJREFUSU9OUlVMRVNcIjpbXCJXUklURVwiXSxcIlNUQVRJQ1wiOltcIldSSVRFXCJdfSxcIkZTU19TRVJWSUNFU19QRVJFR1JJTkU6RlNTX1BHX0FETUlOXCI6e1wiRlNTIFNlcnZpY2VzIFBlcmVncmluZVwiOltcIlZpZXdcIixcIk1vZGlmeVwiLFwiRGVsZXRlXCIsXCJDcmVhdGVcIixcIkF1dGhvcml6ZVwiXX0sXCJYX1JBVEFOT05FOkZNT19PUFNcIjp7XCJSQVRBTl9BVVRPX05FVFRJTkdfUlVMRVwiOltcIkFDQ0VTU19GTU9fUE9TVF9UUkFERV9QT1JUQUxcIl0sXCJSQVRBTl9OT1NUUk9fQkxPVFRFUlwiOltcIkFDQ0VTU19GTU9fUE9TVF9UUkFERV9QT1JUQUxcIl0sXCJSQVRBTl9NT19FWENFUFRJT05cIjpbXCJGX0N1c3RvbV9WaWV3X0J1aWxkZXJfUHJpdmF0ZVwiLFwiQUNDRVNTX0ZNT19QT1NUX1RSQURFX1BPUlRBTFwiXSxcIlJBVEFOX05FVFRJTkdfUlVMRVwiOltcIkFDQ0VTU19GTU9fUE9TVF9UUkFERV9QT1JUQUxcIl0sXCJSQVRBTl9TVVBQUkVTU0lPTl9SVUxFXCI6W1wiRl9JbnB1dF9EZWxldGVfTW9kaWZ5X0luaXRpYXRlXCIsXCJBQ0NFU1NfRk1PX1BPU1RfVFJBREVfUE9SVEFMXCJdLFwiUkFUQU5fVFJBREVfQkxPVFRFUlwiOltcIkZfQ3VzdG9tX1F1ZXJ5X0J1aWxkZXJcIixcIkZfQ3VzdG9tX1ZpZXdfQnVpbGRlcl9Qcml2YXRlXCIsXCJGX0V4cG9ydF9EYXRhXCIsXCJGX1JldHJpZ2dlcl9Db25maXJtYXRpb25fRGlzcGF0Y2hcIixcIkZfVHJhZGVfQWZmaXJtYXRpb25fU3RhdHVzX0NoYW5nZVwiLFwiQUNDRVNTX0ZNT19QT1NUX1RSQURFX1BPUlRBTFwiLFwiVUlfVmlld19UcmFkZV9BdWRpdF9IaXN0b3J5XCJdLFwiUkFUQU5fVkFMSURBVElPTl9FWENFUFRJT05cIjpbXCJGX0N1c3RvbV9WaWV3X0J1aWxkZXJfUHJpdmF0ZVwiLFwiRl9SZXBsYXlfRXhjZXB0aW9uXCIsXCJGX1RyYWRlX0FmZmlybWF0aW9uX1N0YXR1c19DaGFuZ2VcIixcIkFDQ0VTU19GTU9fUE9TVF9UUkFERV9QT1JUQUxcIl0sXCJSQVRBTl9FTlRJVExFTUVOVF9SVUxFXCI6W1wiQUNDRVNTX0ZNT19QT1NUX1RSQURFX1BPUlRBTFwiXSxcIlJBVEFOX1NFVFRMRU1FTlRfU1RQX1JVTEVcIjpbXCJGX0lucHV0X0RlbGV0ZV9Nb2RpZnlfSW5pdGlhdGVcIixcIkFDQ0VTU19GTU9fUE9TVF9UUkFERV9QT1JUQUxcIl0sXCJSQVRBTl9DQVNIRkxPV19CTE9UVEVSXCI6W1wiRl9BZF9Ib2NfTm9zdHJvX0luaXRpYXRlXCIsXCJGX0FkX0hvY19Ob3N0cm9fVmVyaWZ5XCIsXCJGX0FkX0hvY19TU0lfSW5pdGlhdGVcIixcIkZfQWRfSG9jX1NTSV9WZXJpZnlcIixcIkZfQWRfSG9jX1N1cHByZXNzXCIsXCJGX0FkZF9TZXR0bGVtZW50X0NvbW1lbnRcIixcIkZfQ2FzaGZsb3dfQWZmaXJtYXRpb25fU3RhdHVzX0NoYW5nZVwiLFwiRl9DYXNoZmxvd19TdGF0dXNfQ2hhbmdlX1JlbGVhc2VcIixcIkZfQ3VzdG9tX1F1ZXJ5X0J1aWxkZXJcIixcIkZfQ3VzdG9tX1ZpZXdfQnVpbGRlcl9Qcml2YXRlXCIsXCJGX0N1c3RvbV9WaWV3X0J1aWxkZXJfUHVibGljXCIsXCJGX0V4cG9ydF9EYXRhXCIsXCJGX1BlcmZvcm1fQWRfSG9jX05ldHRpbmdcIixcIkZfUGVyZm9ybV9Vbl9OZXRfSW5pdGlhdGVcIixcIkZfUGVyZm9ybV9Vbl9OZXRfVmVyaWZ5XCIsXCJGX1JlaW5zdGF0ZVwiLFwiQUNDRVNTX0ZNT19QT1NUX1RSQURFX1BPUlRBTFwiXSxcIlJBVEFOX1NFVFRMRU1FTlRfRVhDRVBUSU9OXCI6W1wiRl9DdXN0b21fVmlld19CdWlsZGVyX1ByaXZhdGVcIixcIkZfSW5wdXRfRGVsZXRlX01vZGlmeV9TSV9Jbml0aWF0ZVwiLFwiRl9JbnB1dF9EZWxldGVfTW9kaWZ5X1NJX1ZlcmlmeVwiLFwiRl9NYW51YWxfRml4XCIsXCJGX1JlcGxheV9FeGNlcHRpb25cIixcIkFDQ0VTU19GTU9fUE9TVF9UUkFERV9QT1JUQUxcIl19fSIsIm1heF9hZ2UiOjE3MDE3NDU2NjQsInN1YiI6IjIwMDEyMDgiLCJhdXRoX3RpbWUiOjE3MDE3NDIwNjQsImlzcyI6InNpbmdsZS11aS1iZmYiLCJzZXNzaW9uX2lkIjoiQjJENzFFOTg5RUQ1QUY4M0Q2Q0I2NEVDOEU1OEVFMjYiLCJleHAiOjE3MDE3NDMwMTIsImlhdCI6MTcwMTc0MjExMiwianRpIjoic2luZ2xlLXVpLWJmZi1pZCIsIm91ZCI6IntcImZpcnN0TmFtZVwiOlwiS2hhaXJ1bFwiLFwiY291bnRyeVwiOlwiU0dcIixcImxhc3ROYW1lXCI6XCJBbnNoYXIxXCIsXCJwc0VtcGxTdGF0dXNcIjpcIkFcIixcImRlc2NyaXB0aW9uXCI6XCJ1c2VyIGFjY291bnRcIixcImZ1bGxOYW1lXCI6XCJBbnNoYXIxLCBLaGFpcnVsXCIsXCJlbWFpbElkXCI6XCJraGFpcnVsLmFuc2hhcjFAc2MuY29tXCIsXCJjblwiOlwiMjAwMTIwOFwiLFwidGl0bGVcIjpcIk1nciwgRGV2ZWxvcG1lbnRcIixcInVzZXJJZFwiOlwiMjAwMTIwOFwiLFwicHJlZmVycmVkTG9jYWxlXCI6XCJTR1wifSJ9.SKSyhxZ_fY5W9y3H8MaLepE_fBMLzO8vUYl6zv3Vf6CYtG02SIK2p_vpG1Rc4paX6wgrmVBq1L-HTHN9p4zxIQO6Nzu-EpGlk5x3MeXe7V3pfE3LEWtrRozj2bKTp0r1_daOJhVadMs0DX5pmDw2SGGpp9xrqx3xdIt_-O8GdX1FB3m5pNK8_sCSOet5PDyKoaD3XwNtjWOCncB9OtEE2W82uikqaQ36seG2RgZKVsB5ieRHovBdawtNfs1p0DzilNyWAELHQyNYdvTmFQW_9DsI6snyRKkxjYBfQl8ustoFWEFFxDBvdn19URLZJxOcu9gzBSsCV2MgrBXPBNoSIg

![image2023-12-5_10-13-51.png](attachments/image2023-12-5_10-13-51.png)

### 4.12 => 2.5 Low: Redundant Data in Local Storage ****

![image2023-12-5_10-16-18.png](attachments/image2023-12-5_10-16-18.png)

### 4.13 => 0.0 None: Cross-Origin Resource Sharing – Arbitrary Origin Trusted ****

We have removed all "Access-Control-Allow-Origin: *" in all static files and Single-UI-BFF services.

**![image2023-12-5_10-38-44.png](attachments/image2023-12-5_10-38-44.png)**
