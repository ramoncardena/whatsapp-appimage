# 🔒 Security Release v2.0.0 - Critical Update

## ⚠️ SECURITY ADVISORY

This is a **critical security release** that addresses multiple security vulnerabilities discovered during a comprehensive security audit. **All users should upgrade immediately.**

---

## 🚨 Critical Security Fixes

### Disabled Chromium Sandbox (CRITICAL)

**Severity:** Critical
**Impact:** Potential system compromise

**Description:**
Previous versions (< 2.0.0) had the Chromium sandbox completely disabled by default. This removed critical security isolation and could allow malicious code to access system resources.

**Fixed in v2.0.0:**
- ✅ Chromium sandbox is now **enabled by default**
- ✅ Sandbox only disabled when user explicitly passes `--no-sandbox` flag
- ✅ Security warnings displayed when running in reduced security mode

### Code Injection Risk (HIGH)

**Description:**
Template literals in `executeJavaScript` calls created potential code injection vulnerabilities.

**Fixed in v2.0.0:**
- ✅ Replaced with secure IPC communication via preload script
- ✅ All data validated and sanitized before use
- ✅ Proper context isolation maintained

### Weak URL Validation (MEDIUM)

**Description:**
Simple string prefix checks for URL validation could potentially be bypassed.

**Fixed in v2.0.0:**
- ✅ Proper URL parsing with exception handling
- ✅ Protocol validation using URL constructor
- ✅ Default-deny policy for unknown protocols

---

## ✨ New Features & Improvements

- 🎯 **Boss Mode Shortcut Changed:** Now `Ctrl+Shift+B` (was `Ctrl+Shift+P`)
  - Avoids conflict with VS Code command palette
- 🧹 **Cleaner Console Output:** Removed debug logs
- 📚 **Security Documentation:** Added comprehensive security policy

---

## 🔒 Security Features

✅ Chromium sandbox enabled by default (critical fix!)
✅ Context isolation enabled
✅ Node integration disabled
✅ Secure IPC communication
✅ Input validation and sanitization
✅ URL protocol validation

---

## 📥 Installation

### Download & Run

1. Download `WhatsApp-2.0.0.AppImage` below
2. Make it executable: `chmod +x WhatsApp-2.0.0.AppImage`
3. Run: `./WhatsApp-2.0.0.AppImage`

### First-Time Setup (Recommended)

For maximum security, configure your system for sandbox support:

```bash
# Permanent configuration (recommended):
echo "kernel.apparmor_restrict_unprivileged_userns=0" | sudo tee /etc/sysctl.d/99-appimage.conf
sudo sysctl --system
```

### Fallback (Not Recommended)

If you cannot configure sandbox support:

```bash
./WhatsApp-2.0.0.AppImage --no-sandbox
```

⚠️ **Warning:** This reduces security significantly. Only use on trusted networks.

---

## 🔄 Upgrading from v1.x

1. Download the new v2.0.0 AppImage
2. Replace your old version
3. Configure sandbox support (see above)
4. Run normally - all your data is preserved

---

## 📋 What Changed

**New Files:**
- `SECURITY.md` - Security policy and vulnerability reporting guidelines
- `CHANGELOG.md` - Detailed version history
- `preload.js` - Secure IPC bridge

**Modified Files:**
- `main.js` - Security improvements and IPC implementation
- `README.md` - Security documentation and updated shortcuts
- `package.json` - Version bump to 2.0.0

---

## 🐛 Known Issues

- Some Linux distributions require sandbox configuration (Ubuntu 24.04+)
- Console may show harmless inotify warnings (can be ignored)

---

## 🙏 Acknowledgments

Thank you to the security community for helping keep this project secure through responsible disclosure.

---

## 📚 Documentation

- [Full Changelog](https://github.com/ramoncardena/whatsapp-appimage/blob/main/CHANGELOG.md)
- [Security Policy](https://github.com/ramoncardena/whatsapp-appimage/blob/main/SECURITY.md)
- [README](https://github.com/ramoncardena/whatsapp-appimage/blob/main/README.md)

---

## 🔐 Security Reporting

Found a security issue? Please report it responsibly:
- Email: info@ramoncardena.com
- See [SECURITY.md](https://github.com/ramoncardena/whatsapp-appimage/blob/main/SECURITY.md) for details

---

**This release was generated with [Claude Code](https://claude.com/claude-code)**
