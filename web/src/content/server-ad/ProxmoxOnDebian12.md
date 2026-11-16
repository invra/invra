---
title: Proxmox Ontop of Debian 12
writer: InvraNet
summary: Installation of Proxmox onto your Debian 12 (Bookworm) instance
tags:
  - Sysadmin
  - Debian
  - Virtualisation
date: 2025-03-20T23:42:00Z
readTime: 24
lastRevisionDate: 2025-03-28T13:19:00Z
---

## Introduction

The installation of a supported Proxmox VE server should be done via the **bare-metal ISO installer**. However, in some cases, it makes sense to install Proxmox VE on top of a running Debian Bookworm 64-bit, especially if you want a custom partition layout.

For this guide, any official Debian Bookworm installation medium should work.

---

## 1. Install a Standard Debian Bookworm (amd64)

Install a standard Debian Bookworm. Refer to the [Debian installation guide](https://www.debian.org/releases/bookworm/amd64/) and configure a **static IP**.

> **Note:** The Debian installer performs network configuration using **IPv6 autoconfiguration** and **DHCP** by default. To force manual network configuration:
>
> - In **UEFI**: Press `E` and add `netcfg/disable_autoconfig=true` to the Linux command line.
> - In **BIOS**: Select "Help" and start the installation by typing:
>   ```text:command
>   installgui netcfg/disable_autoconfig=true
>   ```

It is recommended to only install:

- "Standard system utilities"
- "SSH server"

A desktop environment is not necessary.

---

## 2. Ensure Hostname Can Be Resolved to an IP Address

Your hostname must resolve to a valid **non-loopback IP**. You can configure this via **DNS** or through an **entry in `/etc/hosts`**.

### **Configure `/etc/hosts`**

Modify `/etc/hosts` to ensure your hostname maps to a proper IP address.

Example `/etc/hosts` file:

```text:/etc/hosts
127.0.0.1       localhost
192.168.15.77   prox4m1.proxmox.com prox4m1

# IPv6 entries
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```

Verify with:

```sh:command
hostname --ip-address
```

This should return a **non-loopback IP**.

---

## 3. Install Proxmox VE

### **3.1 Adapt Your `sources.list`**

Add the Proxmox VE repository:

```sh:command
echo "deb [arch=amd64] http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-install-repo.list
```

Add the Proxmox VE GPG key:

```sh:command
wget https://enterprise.proxmox.com/debian/proxmox-release-bookworm.gpg -O /etc/apt/trusted.gpg.d/proxmox-release-bookworm.gpg
```

Verify the key:

```sh:command
sha512sum /etc/apt/trusted.gpg.d/proxmox-release-bookworm.gpg
```

Update your system:

```sh:command
apt update && apt full-upgrade
```

---

### **3.2 Install the Proxmox VE Kernel**

Install and boot into the **Proxmox VE Kernel**:

```sh:command
apt install proxmox-default-kernel
systemctl reboot
```

---

### **3.3 Install Proxmox VE Packages**

Install required packages:

```sh:command
apt install proxmox-ve postfix open-iscsi chrony
```

> **Note:**
>
> - Replace `chrony` with another **NTP daemon** if needed.
> - Configure `postfix` as **"satellite system"** if you have a mail server.

---

### **3.4 Remove the Default Debian Kernel**

Remove unnecessary kernels to prevent conflicts:

```sh:command
apt remove linux-image-amd64 'linux-image-6.1*'
```

Update GRUB:

```sh:command
update-grub
```

---

### **3.5 Recommended: Remove the `os-prober` Package**

To prevent GRUB from adding **VM partitions**, remove `os-prober`:

```sh:command
apt remove os-prober
```

---

## 4. Connect to the Proxmox VE Web Interface

Access the web interface:

```
https://your-ip-address:8006
```

Log in with the `root` account under the **PAM authentication realm**.

---

### **4.1 Create a Linux Bridge**

Configure a **Linux bridge** (`vmbr0`) for networking. Example `/etc/network/interfaces`:

```text:/etc/network/interfaces
auto lo
iface lo inet loopback

auto vmbr0
iface vmbr0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
    bridge_ports eth0
    bridge_stp off
    bridge_fd 0
```

Apply changes:

```sh:command
systemctl restart networking
```

---

### **4.2 Upload Subscription Key**

If you have a **Proxmox VE subscription**, upload the **subscription key** via the web interface.

To remove the **no-subscription repository**, run:

```sh:command
rm /etc/apt/sources.list.d/pve-install-repo.list
```

---

## 5. Troubleshooting

### **5.1 PVE Kernel Fails to Boot**

If boot fails with `bad shim signature`, **disable Secure Boot** in BIOS.

---

### **5.2 `resolv.conf` Gets Overwritten**

Proxmox VE manages **DNS settings**. Avoid installing:

- `resolvconf` (IPv4)
- `rdnssd` (IPv6)

---

### **5.3 `ipcc_send_rec[1] failed`**

If you see:

```text:console
ipcc_send_rec[1] failed: Connection refused
```

Verify `/etc/hosts` is correctly configured.

---

### **5.4 Network Fails on Boot (NTPsec Hook)**

If networking **fails on boot** but works manually (`ifreload -a`), it may be due to `ntpsec`.

Solution: **Switch to `chrony`**:

```sh:command
apt install chrony
```

---

## Conclusion

You now have **Proxmox VE installed on Debian 12**! 🎉
Use the web interface to create VMs, manage containers, and set up storage.
