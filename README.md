# internywhere-intern-test

Aplikasi web sederhana untuk melakukan CRUD task

## Usage

- jalankan query database.sql menggunakan mysql

dalam windows dapat menggunakan command

```
mysql -u root -p < ./database.sql
```

- buat .env pada sub folder backend, dapat menggunakan .env.example untuk default

dalam windows dapat menggunakan command powershell

```
cp ./.env.example ./.env
```

- pindah ke sub folder backend lalu install module dan jalankan npm start

```
cd ./backend
npm install
npm start
```

- buat terminal baru, pindah ke sub folder frontend lalu install module jalankan npm start

```
cd ./frontend
npm install
npm start
```

- buka http://localhost:3000 pada browser