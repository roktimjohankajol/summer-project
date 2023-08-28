
    const cardItems = document.querySelectorAll('#card-item');
    const selectedCardsList = document.querySelector('#selected-cards-list');
    const totalPriceElement = document.querySelector('#total-price');
    const totalAmountElement = document.querySelector('#total-amount');
    const applyBtn = document.querySelector('#apply-btn');
    const couponCodeInput = document.querySelector('#coupon-code');
    const discountPriceElement = document.querySelector('#discount-price');
    const makePurchaseBtn = document.querySelector('#make-purchase-btn');

    // Congratulation Modal 
    const modal = document.getElementById('popup-modal');
    const closeBtn = document.querySelector('.close-button');
    const goToHomeButton = document.getElementById('go-to-home-button');

    let selectedCards = [];
    let totalAmount = 0;
    let discountApplied = false;

    cardItems.forEach((card, index) => {
        card.addEventListener('click', () => {
            const title = card.querySelector('#card-item-title').textContent;
            const price = parseFloat(card.querySelector('#card-item-price').textContent);

            const currentTotalPrice = parseFloat(totalPriceElement.textContent);
            totalAmount += price;

            totalPriceElement.textContent = totalAmount.toFixed(2);
            totalAmountElement.textContent = totalAmount.toFixed(2);

            if (totalAmount >= 200 && !discountApplied) {
                applyBtn.removeAttribute('disabled');
                applyBtn.style.opacity = '1';
            }
            
            selectedCards.push(title);
            updateSelectedCardsList();
            card.classList.add('selected');

            makePurchaseBtn.disabled = totalAmount === 0;
        });
    });

    applyBtn.addEventListener('click', () => {
        const couponCode = couponCodeInput.value.trim();
        if (couponCode === 'SELL200' && totalAmount >= 200) {
            const discount = totalAmount * 0.2;
            totalAmount -= discount;
            discountPriceElement.textContent = discount.toFixed(2);
            totalAmountElement.textContent = totalAmount.toFixed(2);
            discountApplied = true;
            applyBtn.disabled = true;
            couponCodeInput.value = ''; 
        }
    });
    function updateSelectedCardsList() {
        selectedCardsList.innerHTML = '';
        selectedCards.forEach((title, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>${index + 1}.</span> ${title}`;
            selectedCardsList.appendChild(listItem);
        });
    }
    

    // Congratulation Modal 


    makePurchaseBtn.addEventListener('click', () => {
        if (totalAmount > 0) {
            modal.style.display = 'block';
        } else {
            alert('Please select items for purchase first.');
        }
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    goToHomeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
    