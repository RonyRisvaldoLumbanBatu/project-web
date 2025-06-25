const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el));

const tombolBukaModal = document.getElementById('buka-modal-btn');
const modal = document.getElementById('register-modal');
const tombolTutupModal = document.querySelector('.close-button');

tombolBukaModal.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.add('modal-terbuka');
});

tombolTutupModal.addEventListener('click', () => {
    modal.classList.remove('modal-terbuka');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('modal-terbuka');
    }
});

const formRegister = document.getElementById('form-registrasi');

formRegister.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Terima kasih! Akun Anda telah berhasil dibuat.');
    modal.classList.remove('modal-terbuka');
});

const semuaInputJumlah = document.querySelectorAll('.quantity-input');
const elemenTotalHarga = document.getElementById('total-price');

function hitungTotalHarga() {
    let totalHarga = 0;
    semuaInputJumlah.forEach(input => {
        const jumlah = parseInt(input.value);
        const itemProduk = input.closest('.product-item');
        const harga = parseInt(itemProduk.dataset.price);
        totalHarga += harga * jumlah;
    });

    elemenTotalHarga.textContent = 'Rp ' + totalHarga.toLocaleString('id-ID');
}

semuaInputJumlah.forEach(input => {
    input.addEventListener('input', hitungTotalHarga);
});
