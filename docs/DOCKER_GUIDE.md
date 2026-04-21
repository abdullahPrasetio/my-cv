# Panduan Penggunaan Docker - Universal Portfolio

Dokumen ini menjelaskan cara membungkus, menjalankan, dan melakukan kustomisasi aplikasi Portfolio menggunakan Docker. Project ini didesain agar Anda cukup melakukan **build satu kali**, namun bisa dijalankan dengan berbagai versi tampilan dan data yang berbeda.

---

## 1. Persiapan
Pastikan Anda telah menginstal:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (opsional, untuk kemudahan)

---

## 2. Membangun Image (Build)
Anda hanya perlu menjalankan perintah ini satu kali atau saat ada perubahan kode program (Logic/UI).

```bash
docker build -t my-cv-universal .
```

---

## 3. Menjalankan Container (Run)

### A. Menjalankan Versi Default (V2)
Secara default, aplikasi akan berjalan pada Versi 2 di port 8080.
```bash
docker run -d -p 8080:80 --name my-portfolio my-cv-universal
```

### B. Menentukan Versi Utama via Environment Variable
Anda bisa menentukan versi mana yang muncul saat pertama kali membuka `/` (Home) menggunakan variabel `DEFAULT_VERSION`.

**Contoh: Menjadikan Versi 1 sebagai tampilan utama**
```bash
docker run -d -p 8081:80 \
  -e DEFAULT_VERSION=v1 \
  --name portfolio-v1 \
  my-cv-universal
```

---

## 4. Kustomisasi Data CV (Tanpa Build Ulang)
Anda bisa menimpa data CV bawaan dengan file JSON milik Anda sendiri yang ada di komputer menggunakan fitur **Volume Mounting**.

Misalkan Anda memiliki file `data-baru.json` di folder saat ini:
```bash
docker run -d -p 8082:80 \
  -e DEFAULT_VERSION=v2 \
  -v $(pwd)/data-baru.json:/usr/share/nginx/html/cv.json \
  --name portfolio-custom-data \
  my-cv-universal
```

---

## 5. Menggunakan Docker Compose (Direkomendasikan)
Untuk pengelolaan yang lebih rapi, gunakan file `docker-compose.yml`.

### Contoh Konfigurasi `docker-compose.yml`:
```yaml
version: "3.8"
services:
  portfolio:
    build: .
    ports:
      - "8080:80"
    environment:
      - DEFAULT_VERSION=v2 # Ganti ke v1, v2, v3, dst
    volumes:
      - ./src/data/cv.json:/usr/share/nginx/html/cv.json # Timpa data CV di sini
    restart: always
```

**Perintah Menjalankan:**
```bash
docker-compose up -d
```

---

## 6. Ringkasan Parameter (Environment Variables)

| Variabel | Pilihan | Deskripsi |
| :--- | :--- | :--- |
| `DEFAULT_VERSION` | `v1`, `v2`, `v3`, dst | Menentukan tampilan mana yang dimuat saat user mengakses `/`. |

---

## 7. Troubleshooting
- **Aplikasi tidak update setelah ganti ENV?**
  Hapus container lama dan jalankan ulang (`docker rm -f <container_id>`).
- **File JSON tidak terbaca?**
  Pastikan format JSON Anda valid (cek koma dan tanda kutip).
- **Port konflik?**
  Pastikan port 8080 tidak digunakan aplikasi lain, atau ganti angka di sebelah kiri (misal `9000:80`).

---

**Dibuat oleh:** Gemini CLI Agent  
**Tanggal:** 21 April 2026
