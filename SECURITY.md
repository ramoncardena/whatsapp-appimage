# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

We take the security of this project seriously. If you believe you have found a security vulnerability, please report it to us responsibly.

### How to Report

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: **info@ramoncardena.com**

Include the following information:
- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

### What to Expect

- **Acknowledgment**: You should receive an acknowledgment within 48 hours.
- **Updates**: We will send you regular updates about our progress.
- **Credit**: If you would like, we will credit you in the security advisory.
- **Timeline**: We aim to resolve critical issues within 7 days, and other issues within 30 days.

## Security Best Practices for Users

### Sandbox Mode (Important)

For maximum security, we recommend running the application **with** the Chromium sandbox enabled (default in v2.0+).

If you encounter sandbox-related errors:
1. Update your system to allow unprivileged user namespaces (recommended)
2. Or run with `--no-sandbox` flag (reduces security - see below)

### Running with Reduced Security (Not Recommended)

If you must disable the sandbox:
```bash
./WhatsApp-2.0.0.AppImage --no-sandbox
```

**Warning:** This significantly reduces security protections and should only be used if you:
- Trust your network completely (no public WiFi)
- Keep your system fully updated
- Understand the security implications

### Additional Security Recommendations

1. **Keep Updated**: Always use the latest version of the application
2. **Network Security**: Avoid using on untrusted networks without VPN
3. **System Updates**: Keep your operating system and dependencies updated
4. **Permissions**: Only grant necessary permissions when prompted

## Known Security Considerations

### Chromium Sandbox

This Electron application uses Chromium's sandbox to isolate potentially malicious code. On some Linux distributions, you may need to configure kernel settings:

```bash
# Enable unprivileged user namespaces (may require reboot)
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
```

Or make it permanent:
```bash
echo "kernel.apparmor_restrict_unprivileged_userns=0" | sudo tee /etc/sysctl.d/99-appimage.conf
sudo sysctl --system
```

### Remote Content

This application loads `https://web.whatsapp.com`. The security of your communications depends on:
- WhatsApp's web application security
- Your network security (use HTTPS always)
- The security of this wrapper application

## Security Features

- ✅ Chromium sandbox enabled by default (v2.0+)
- ✅ Node integration disabled in renderer processes
- ✅ Context isolation enabled
- ✅ Controlled window opening with external link handling
- ✅ Restricted permission model (notifications only)
- ✅ Secure IPC communication (no code injection)
- ✅ Input validation and URL protocol checking

## Vulnerability Disclosure Timeline

We follow responsible disclosure practices:

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Initial triage and acknowledgment
3. **Day 3-7**: Investigation and fix development
4. **Day 7-14**: Testing and validation
5. **Day 14-30**: Coordinated public disclosure (after fix is released)

## Past Security Issues

| Version | Issue | Severity | Status |
|---------|-------|----------|--------|
| < 2.0   | Disabled Chromium sandbox | Critical | Fixed in v2.0 |
| < 2.0   | Code injection risk in executeJavaScript | High | Fixed in v2.0 |
| < 2.0   | Weak URL validation | Medium | Fixed in v2.0 |

## Contact

- Email: info@ramoncardena.com
- GitHub: Report vulnerabilities privately through email only

## Scope

This security policy applies to:
- The main application code (main.js, preload scripts)
- Build configuration
- Distribution packages (AppImages)

This policy does NOT cover:
- WhatsApp Web itself (report to Meta/WhatsApp)
- Third-party dependencies (report to respective maintainers)
- Operating system vulnerabilities

## Attribution

We thank the security researchers who have responsibly disclosed vulnerabilities to us. Contributors will be acknowledged here with their permission.

---

*Last updated: 2026-01-12*
