// Data Menu (Bisa ditambah atau diubah dengan mudah)
const dataMenu = [
    { id: 1, nama: "Kopi Susu Gula Aren", kategori: "minuman", harga: 18000, deskripsi: "Kopi espresso dengan susu dan gula aren asli", gambar: "https://placehold.co/100x100/eeeeee/333333?text=Kopi" },
    { id: 2, nama: "Nasi Goreng Spesial", kategori: "makanan", harga: 25000, deskripsi: "Nasi goreng dengan telur, ayam, dan kerupuk", gambar: "https://placehold.co/100x100/eeeeee/333333?text=Nasgor" },
    { id: 3, nama: "Kentang Goreng", kategori: "camilan", harga: 15000, deskripsi: "Potongan kentang renyah dengan saus sambal", gambar: "https://placehold.co/100x100/eeeeee/333333?text=Kentang" },
    { id: 4, nama: "Es Teh Manis", kategori: "minuman", harga: 8000, deskripsi: "Teh melati seduh segar dengan es", gambar: "https://placehold.co/100x100/eeeeee/333333?text=Es+Teh" }
];

let keranjang = []; // Menyimpan pesanan pelanggan

// Fungsi untuk menampilkan menu ke HTML
function tampilkanMenu(kategori = 'semua') {
    const tempatMenu = document.getElementById('daftar-menu');
    tempatMenu.innerHTML = ''; // Kosongkan dulu

    const menuDifilter = kategori === 'semua' ? dataMenu : dataMenu.filter(m => m.kategori === kategori);

    menuDifilter.forEach(menu => {
        tempatMenu.innerHTML += `
            <div class="kartu-menu">
                <img src="${menu.gambar}" alt="${menu.nama}">
                <div class="info-menu">
                    <h3>${menu.nama}</h3>
                    <p>${menu.deskripsi}</p>
                    <div class="harga-tambah">
                        <span class="harga">Rp ${menu.harga.toLocaleString('id-ID')}</span>
                        <button class="btn-tambah" onclick="tambahKeKeranjang(${menu.id})">+ Tambah</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Fungsi filter menu saat tombol kategori diklik
function filterMenu(kategori) {
    // Ubah warna tombol aktif
    document.querySelectorAll('.btn-kategori').forEach(btn => btn.classList.remove('aktif'));
    event.target.classList.add('aktif');
    tampilkanMenu(kategori);
}

// Fungsi menambahkan item ke keranjang
function tambahKeKeranjang(id) {
    const menu = dataMenu.find(m => m.id === id);
    keranjang.push(menu);
    updateKeranjang();
    alert(`${menu.nama} ditambahkan!`);
}

// Fungsi memperbarui tampilan keranjang di bawah layar
function updateKeranjang() {
    const totalItem = keranjang.length;
    const totalHarga = keranjang.reduce((total, item) => total + item.harga, 0);

    document.getElementById('total-item').innerText = `${totalItem} Item`;
    document.getElementById('total-harga').innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;

    const elemenKeranjang = document.getElementById('keranjang');
    if (totalItem > 0) {
        elemenKeranjang.classList.remove('sembunyi'); // Munculkan keranjang
    } else {
        elemenKeranjang.classList.add('sembunyi'); // Sembunyikan jika kosong
    }
}

// Fungsi mengirim pesanan ke WhatsApp
function kirimKeWhatsApp() {
    if (keranjang.length === 0) return alert("Keranjang masih kosong!");

    const nomorWA = "6281234567890"; // Ganti dengan nomor WA Kasir/Pelayan
    
    // Format pesan
    let teksPesanan = "Halo, saya ingin memesan:\n\n";
    keranjang.forEach((item, index) => {
        teksPesanan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}\n`;
    });
    
    const totalHarga = keranjang.reduce((total, item) => total + item.harga, 0);
    teksPesanan += `\n*Total: Rp ${totalHarga.toLocaleString('id-ID')}*\n\nNomor Meja: (Isi sendiri)\nTerima kasih!`;

    // Ubah teks menjadi format URL dan buka WhatsApp
    const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(teksPesanan)}`;
    window.open(urlWA, '_blank');
}

// Jalankan fungsi tampilkan menu pertama kali saat web dibuka
tampilkanMenu();
