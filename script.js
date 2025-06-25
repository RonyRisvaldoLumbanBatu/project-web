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

if (tombolBukaModal && modal && tombolBukaModal) {
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
        const submitButton = formRegister.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Memproses...';

        setTimeout(() => {
            alert('Terima Kasih! Akun Anda telah berhasil dibuat.');
            modal.classList.remove('modal-terbuka');
            submitButton.disabled = false;
            submitButton.textContent = 'Buat Akun';
            formRegister.reset();
        }, 1500);
    });
}

const tombolKembaliKeAtas = document.getElementById('kembali-ke-atas');
if (tombolKembaliKeAtas){
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400){
            tombolKembaliKeAtas.classList.add('show');
        } else {
            tombolKembaliKeAtas.classList.remove('show');
        }
    });
}

const billingToggle = document.getElementById('billing-toggle');
const semuaItemProduk = document.querySelectorAll('.product-item');
const semuaSelHargaTabel = document.querySelectorAll('.pricing-table td[data-harga-bulanan]');
const semuaInputJumlah = document.querySelectorAll('.quantity-input');
const elemenTotalHarga = document.getElementById('total-price');

function hitungTotalHarga() {
    let totalHarga = 0;
    const isYearly = billingToggle ? billingToggle.checked : false;

   semuaInputJumlah.forEach(input => {
    const jumlah = parseInt(input.value) || 0;
    const itemProduk = input.closest('.product-item');

    if (itemProduk){
        const harga = isYearly
        ? parseInt(itemProduk.dataset.hargaTahunan)
        : parseInt(itemProduk.dataset.hargaBulanan);
        
        if (!isNaN(harga)){
            totalHarga += harga * jumlah;
        }
    }
   });

   if (elemenTotalHarga){
    elemenTotalHarga.textContent = 'Rp ' + totalHarga.toLocaleString('id-ID');
   }
}

function perbaruiTampilanHarga() {
    const isYearly = billingToggle ? billingToggle.checked : false;
    const periode = isYearly ? '/thn' : '/bln';
    semuaItemProduk.forEach(item => {
        const harga = isYearly ? item.dataset.hargaTahunan : item.dataset.hargaBulanan;
        const elemenHarga = item.querySelector('.price');
        if (elemenHarga && harga) {
            elemenHarga.textContent = `Rp ${parseInt(harga).toLocaleString('id-ID')}${periode}`;
        } 
    });
    semuaSelHargaTabel.forEach(sel => {
        const harga = isYearly ? sel.dataset.hargaTahunan : sel.dataset.hargaBulanan;
        if (sel && harga){
            sel.innerHTML = `<strong> ${parseInt(harga).toLocaleString('id-ID')}</strong>${periode}`;
        }
    });
    hitungTotalHarga();
}

if (billingToggle){
    billingToggle.addEventListener('change', perbaruiTampilanHarga);
}

semuaInputJumlah.forEach(input => {
    input.addEventListener('input', hitungTotalHarga);
});

perbaruiTampilanHarga();

const contactForm = document.querySelector('.contact-form');
if (contactForm){
    contactForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';

        setTimeout(() => {
            alert('Pesan Anda telah terkirim!');
            contactForm.reset();
            submitButton.disabled = false
            submitButton.textContent = 'Kirim Pesan';
        }, 1500);
    });
}
