document.addEventListener('DOMContentLoaded', function () {
    const offers = document.querySelectorAll('.offer input[type="radio"]');
    let previousOffer = null; // To remember the previously selected offer

    // Function to handle the radio button change
    function handleRadioChange() {
        const offerElement = this.closest('.offer');
        const briefLabel = offerElement.querySelector('.briefLabel');
        const buyingOption = briefLabel.querySelector('.buyingOption');
        const discount = briefLabel.querySelector('.discount'); // Extract the discount
        const existingOptionGroupContainer = offerElement.querySelector('.option-group-container');



        // Unhide the previous briefLabel and remove its option-group-container
        if (previousOffer && previousOffer !== offerElement) {
            const previousBriefLabel = previousOffer.querySelector('.briefLabel');
            const previousOptionGroupContainer = previousOffer.querySelector('.option-group-container');

            if (previousBriefLabel) {
                previousBriefLabel.style.removeProperty('display'); // Remove the display style to unhide
            }
            if (previousOptionGroupContainer) {
                previousOptionGroupContainer.remove(); // Remove the previous option-group-container
            }
        }

        // Hide the current briefLabel
        if (briefLabel) {
            briefLabel.style.display = 'none'; // Hide the current brief label
        }

        // Remove the existing option-group-container if it exists
        if (existingOptionGroupContainer) {
            existingOptionGroupContainer.remove(); // Remove the current option-group-container
        }

        // Create a new option-group-container element
        const optionGroupContainer = document.createElement('div');
        optionGroupContainer.className = 'option-group-container';

        // Create and append the buyingOption to the container
        if (buyingOption) {
            const buyingOptionClone = buyingOption.cloneNode(true);
            optionGroupContainer.appendChild(buyingOptionClone);
        }

        // Create the option group
        const optionGroup = document.createElement('div');
        optionGroup.className = 'option-group';

        const sizeOption = document.createElement('div');
        sizeOption.className = 'option';
        sizeOption.innerHTML = `
                <label for="size1">Size</label>
                <div class="flex itemsCenter"> #1 
                    <select id="size1" class="ml-5">
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                </select>
                </div>
                <div class="flex itemsCenter sizeOption"> #2
                    <select id="size2" class="ml-5">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                    </select>
                </div>
            `;
        optionGroup.appendChild(sizeOption);

        const colorOption = document.createElement('div');
        colorOption.className = 'option';
        colorOption.innerHTML = `
                <label for="color1">Colour</label>
                <select id="color1">
                    <option>Black</option>
                    <option>Red</option>
                    <option>Blue</option>
                </select>
                <select id="color2">
                    <option>Black</option>
                    <option>Red</option>
                    <option>Blue</option>
                </select>
            `;
        optionGroup.appendChild(colorOption);

        optionGroupContainer.appendChild(optionGroup);

        // Create the discount-wrapper
        const discountWrapper = discount ? `<div class="discount-wrapper custom-radio">${discount.innerHTML}</div>` : '';

        // Find offer-text inside option-group-container and concatenate the discount-wrapper
        const offerText = optionGroupContainer.querySelector('.offer-text');
        if (offerText) {
            offerText.innerHTML += discountWrapper; // Concatenate discount-wrapper with offer-text content
        }

        offerElement.appendChild(optionGroupContainer);

        // Update the previousOffer to the current one
        previousOffer = offerElement;
    }

    // Attach event listeners to each radio button
    offers.forEach(offer => {
        offer.addEventListener('change', handleRadioChange);
    });

    // Set the default checked radio button and display its option-group-container
    const defaultCheckedOffer = document.querySelector('.offer input[type="radio"]:checked');
    if (defaultCheckedOffer) {
        handleRadioChange.call(defaultCheckedOffer);
    }
});
