# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - link "Job Portal Logo Job Portal" [ref=e4] [cursor=pointer]:
      - /url: /
      - img "Job Portal Logo" [ref=e5]
      - text: Job Portal
    - generic [ref=e6]:
      - link "Login" [ref=e7] [cursor=pointer]:
        - /url: /login
        - button "Login" [ref=e8]
      - link "Register" [ref=e9] [cursor=pointer]:
        - /url: /jobseeker/register
        - button "Register" [ref=e10]
  - generic [ref=e11]:
    - generic [ref=e12]: Registration successful. You can now log in.
    - button "×" [ref=e13] [cursor=pointer]
  - generic [ref=e15]:
    - heading "Login" [level=1] [ref=e16]
    - generic [ref=e17]:
      - textbox "Email or Phone Number" [ref=e18]: recruiter1775466692687@company.com
      - textbox "Password" [ref=e19]: Pass@123
      - button "Login" [active] [ref=e20] [cursor=pointer]
  - contentinfo [ref=e21]:
    - generic [ref=e23]:
      - link "About Us" [ref=e24] [cursor=pointer]:
        - /url: /about-us
      - link "Privacy Policy" [ref=e25] [cursor=pointer]:
        - /url: /privacy-policy
      - link "Terms of Service" [ref=e26] [cursor=pointer]:
        - /url: /terms
```