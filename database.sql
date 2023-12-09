# buat database yang akan digunakan
CREATE DATABASE IF NOT EXISTS aufa;

# gunakan database untuk query pembuatan tabel
USE aufa;

# query pembuatan tabel tasks
CREATE TABLE tasks (
    task_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    task_description TEXT NOT NULL,
    task_due_date DATE NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# query seeding sample data
INSERT INTO tasks (task_name, task_description, task_due_date)
VALUES
    ('tugas metodologi penelitian', 'membuat draft proposal dan presentasi tugas akhir', '2022-05-10'),
    ('tugas manajemen jaringan', 'membuat topologi jaringan perusahaan', '2022-05-16'),
    ('tugas semantik web', 'merubah data yang didapat dari twitter menjadi bentuk rdf', '2022-05-24'),
    ('tugas pengembangan aplikasi mobile', 'membuat aplikasi mobile pendidikan matematika', '2021-11-13'),
    ('tugas natural language processing', 'melakukan analisis sentimen terhadap kebijakan covid pemerintah', '2021-11-10'),
    ('tugas pemrograman web', 'membuat backend web penggalangan donasi', '2021-11-06'),
    ('tugas kapita selekta', 'menerapkan deteksi emosi pada wajah untuk penilaian wawancara', '2021-06-03'),
    ('tugas teori bahasa dan automata', 'membuat program simulasi turing machine', '2021-05-22'),
    ('tugas kecerdasan buatan', 'menerapkan kecerdasan buatan untuk mendeteksi harga dogecoin', '2021-06-03'),
    ('tugas konsep pemrograman', 'membuat game snake menggunakan c++', '2019-11-20');