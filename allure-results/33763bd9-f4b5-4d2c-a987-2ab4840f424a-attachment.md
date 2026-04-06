# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "Job Portal Logo Job Portal" [ref=e4] [cursor=pointer]:
      - /url: /recruiter/home
      - img "Job Portal Logo" [ref=e5]
      - text: Job Portal
    - link "Logout " [ref=e6] [cursor=pointer]:
      - /url: /logout
      - text: Logout
      - generic [ref=e7]: 
  - generic [ref=e8]:
    - heading "Recruiter Dashboard" [level=1] [ref=e9]
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]: 
        - heading "Post New Job" [level=2] [ref=e13]
        - link "Create Job" [ref=e14] [cursor=pointer]:
          - /url: /recruiter/post-job
      - generic [ref=e15]:
        - generic [ref=e16]: 
        - heading "Manage Jobs" [level=2] [ref=e17]
        - link "View Jobs" [ref=e18] [cursor=pointer]:
          - /url: /recruiter/manage-jobs
      - generic [ref=e19]:
        - generic [ref=e20]: 
        - heading "View Applications" [level=2] [ref=e21]
        - link "View Applications" [ref=e22] [cursor=pointer]:
          - /url: /recruiter/view-applicaitions
  - contentinfo [ref=e23]:
    - generic [ref=e25]:
      - link "About Us" [ref=e26] [cursor=pointer]:
        - /url: /about-us
      - link "Privacy Policy" [ref=e27] [cursor=pointer]:
        - /url: /privacy-policy
      - link "Terms of Service" [ref=e28] [cursor=pointer]:
        - /url: /terms
```