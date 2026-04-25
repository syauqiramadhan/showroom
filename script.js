const cars = [
    {
        id: 1,
        name: "Mitsubishi L300 Pick-Up FB",
        type: "l300",
        price: "Rp 215.000.000",
        engine: "2.2L Diesel Euro 4",
        power: "99 PS / 200 Nm",
        image: "assets/l300.png",
        badge: "Ready Stock"
    },
    {
        id: 2,
        name: "Mitsubishi L300 Cab Chas",
        type: "l300",
        price: "Rp 210.000.000",
        engine: "2.2L Diesel Euro 4",
        power: "99 PS / 200 Nm",
        image: "assets/l300.png",
        badge: "Promo Bunga 0%"
    },
    {
        id: 3,
        name: "Mitsubishi Triton 4x4",
        type: "pickup",
        price: "Rp 450.000.000",
        engine: "2.4L MIVEC Turbo",
        power: "181 PS",
        image: "assets/triton.png",
        badge: "Terlaris"
    },
    {
        id: 4,
        name: "Toyota Hilux GR Sport",
        type: "pickup",
        price: "Rp 750.000.000",
        engine: "2.8L Diesel",
        power: "204 PS",
        image: "assets/hilux.png",
        badge: "Premium"
    }
];

const carGrid = document.getElementById('carGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('carModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');

const WA_NUMBER = "6281774847434";

// Initial Render
function renderCars(filter = 'all') {
    carGrid.innerHTML = '';
    const filteredCars = filter === 'all' ? cars : cars.filter(car => car.type === filter);

    filteredCars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-image" style="background-image: url('${car.image}')">
                <span class="car-badge">${car.badge}</span>
            </div>
            <div class="car-info">
                <h3>${car.name}</h3>
                <div class="car-specs">
                    <span><i class="fas fa-microchip"></i> ${car.engine}</span>
                    <span><i class="fas fa-bolt"></i> ${car.power}</span>
                </div>
                <div class="car-price">
                    <span>${car.price}</span>
                    <button class="btn-primary" style="padding: 8px 15px; font-size: 0.7rem;" onclick="showDetails(${car.id})">Detail</button>
                </div>
            </div>
        `;
        carGrid.appendChild(carCard);
    });
}

// Show Details Modal
window.showDetails = (id) => {
    const car = cars.find(c => c.id === id);
    const waMessage = encodeURIComponent(`Halo Jaya Motor, saya tertarik dengan unit ${car.name}. Boleh minta info detailnya?`);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

    modalBody.innerHTML = `
        <div class="modal-img" style="background-image: url('${car.image}')"></div>
        <div class="modal-details">
            <h2 style="font-size: 2rem; margin-bottom: 20px; color: #d4af37;">${car.name}</h2>
            <p style="color: #b3b3b3; margin-bottom: 20px;">Unit tangguh siap tempur di segala medan. Kondisi prima dan siap pakai untuk kebutuhan bisnis atau hobi off-road Anda.</p>
            <div style="display: grid; gap: 15px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <span>Mesin</span>
                    <span style="color: #fff;">${car.engine}</span>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <span>Tenaga</span>
                    <span style="color: #fff;">${car.power}</span>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <span>Harga</span>
                    <span style="color: #d4af37; font-weight: bold;">${car.price}</span>
                </div>
            </div>
            <a href="${waUrl}" target="_blank" class="btn-primary" style="width: 100%; display: block; text-align: center; text-decoration: none;">Tanyakan di WhatsApp</a>
        </div>
    `;
    modal.style.display = 'flex';
};

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCars(btn.dataset.filter);
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial Load
renderCars();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
