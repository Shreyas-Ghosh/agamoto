# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.1.x   | ✅ Yes             |
| 1.0.x   | ⚠️ Security fixes only |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

If you discover a security vulnerability in Agamoto, please report it responsibly.

### How to Report

1. **DO NOT** open a public issue for security vulnerabilities
2. Email the maintainer at: **shreyas.ghosh@example.com**
3. Include the following in your report:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report
- **Assessment**: Within 1 week, we will assess the severity
- **Fix timeline**: Critical vulnerabilities will be patched within 72 hours; others within 2 weeks
- **Disclosure**: We will coordinate responsible disclosure with you

### Scope

The following are in scope for security reports:

- API key exposure or leakage
- Server-side injection vulnerabilities
- Cross-site scripting (XSS) in the frontend
- Authentication/authorization bypasses
- Sensitive data exposure in API responses
- Dependency vulnerabilities with known exploits

### Out of Scope

- Vulnerabilities in third-party services (Groq, Serper.dev, Ollama)
- Social engineering attacks
- Denial of service (DoS) attacks
- Issues in development/local-only configurations

## Security Best Practices

### For Contributors

- Never commit API keys or secrets to the repository
- Use `.env` files for all sensitive configuration (covered by `.gitignore`)
- Keep dependencies updated and run `npm audit` regularly
- Validate and sanitize all user inputs on the server side

### For Deployers

- Set `CORS` to specific allowed origins in production (not `*`)
- Use HTTPS in production
- Rotate API keys periodically
- Monitor the `/api/health` endpoint for uptime

## Known Security Considerations

1. **CORS**: Currently set to `origin: '*'` — should be restricted in production
2. **Rate Limiting**: No rate limiting is implemented — consider adding `express-rate-limit` in production
3. **Input Validation**: Company name is trimmed and capped at 100 characters; further validation may be needed
4. **localStorage**: User reviews are stored in browser localStorage, which is accessible to any script on the page
