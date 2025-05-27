        import projectItems from "./src/ProjectItems.js";
        import estimatePrompt from "./src/ProjectEstimates.js";

        function createItemRow(item, index) {
            const row = document.createElement('div');
            row.className = 'item-row';
            row.innerHTML = `
                <input type="checkbox" class="checkbox" data-index="${index}"}>
                <div class="item-name">${item.name}</div>
                <select class="complexity-select" data-index="${index}">
                    <option value="best" class="complexity-best">Best</option>
                    <option value="mid" class="complexity-mid" selected>Mid</option>
                    <option value="worst" class="complexity-worst">Worst</option>
                </select>
                ${item.hasQuantity ? 
                    `<input type="number" class="quantity-input" data-index="${index}" value="1" min="1">` : 
                    `<div>N/A</div>`
                }
                <div class="hours-display" data-index="${index}">0</div>
            `;
            return row;
        }

        function initializeItems() {
            const itemsList = document.getElementById('itemsList');
            projectItems.forEach((item, index) => {
                itemsList.appendChild(createItemRow(item, index));
            });
        }

        function calculateItemHours(index) {
            const item = projectItems[index];
            const checkbox = document.querySelector(`input[type="checkbox"][data-index="${index}"]`);
            const complexitySelect = document.querySelector(`select[data-index="${index}"]`);
            const quantityInput = document.querySelector(`input[type="number"][data-index="${index}"]`);
            const hoursDisplay = document.querySelector(`.hours-display[data-index="${index}"]`);
            const row = checkbox.closest('.item-row');

            if (!checkbox.checked) {
                hoursDisplay.textContent = '0';
                row.classList.remove('included');
                return 0;
            }

            row.classList.add('included');
            const complexity = complexitySelect.value;
            const baseHours = item[complexity];
            const quantity = item.hasQuantity && quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            const totalHours = baseHours * quantity;
            
            hoursDisplay.textContent = totalHours;
            
            // Update complexity select styling
            complexitySelect.className = `complexity-select complexity-${complexity}`;
            
            return totalHours;
        }

        function updateTotals() {
            let totalHours = 0;
            projectItems.forEach((item, index) => {
                totalHours += calculateItemHours(index);
            });

            document.getElementById('totalHours').textContent = totalHours;

            const buffer = parseFloat(document.getElementById('buffer').value) || 0;
            const bufferedHours = Math.round(totalHours * (1 + buffer / 100));
            document.getElementById('bufferedHours').textContent = bufferedHours;

            calculateWeekEstimates(bufferedHours);
        }

        function calculateWeekEstimates(totalHours) {
            const teamSize = parseInt(document.getElementById('teamSize').value) || 1;
            const dedication = parseFloat(document.getElementById('dedication').value) || 4;
            
            const dailyTeamCapacity = teamSize * dedication;
            const weeklyTeamCapacity = dailyTeamCapacity * 5; // 5 working days

            if (weeklyTeamCapacity > 0) {
                const baseWeeks = totalHours / weeklyTeamCapacity;
                
                // Apply different multipliers for best, mid, worst scenarios
                const bestWeeks = Math.ceil(baseWeeks * 0.8); // Best case: 20% faster
                const midWeeks = Math.ceil(baseWeeks); // Mid case: as calculated
                const worstWeeks = Math.ceil(baseWeeks * 1.5); // Worst case: 50% slower

                document.getElementById('bestWeeks').textContent = bestWeeks;
                document.getElementById('midWeeks').textContent = midWeeks;
                document.getElementById('worstWeeks').textContent = worstWeeks;
            }
        }
        function createPrompt(){
            const teamSize = parseInt(document.getElementById('teamSize').value);
            const dedication = parseFloat(document.getElementById('dedication').value);
            const bestCaseWeek = document.getElementById('bestWeeks').textContent 
            const midCaseWeek = document.getElementById('midWeeks').textContent 
            const worstCaseWeek = document.getElementById('worstWeeks').textContent
            const copyMessage = document.getElementById('copyMessage');
            let promptTime = `personas dedicadas: ${teamSize} horas de dedicación: ${dedication} bestCaseWeek: ${bestCaseWeek} midCaseWeek: ${midCaseWeek} worstCaseWeek: ${worstCaseWeek}`

            let promptReq = "En base a esas consideraciones, armame un documento de analisis contemplando lo siguiente: ";
            projectItems.forEach((item,index)=>{
                const checkbox = document.querySelector(`input[type="checkbox"][data-index="${index}"]`);
                const complexitySelect = document.querySelector(`select[data-index="${index}"]`);
                const hoursDisplay = document.querySelector(`.hours-display[data-index="${index}"]`);
                checkbox.checked ? (promptReq = promptReq + item.name + "estimado: " + complexitySelect.value + " Horas:" + hoursDisplay.textContent + "\n") : promptReq;
            })
            
            const finalPrompt=estimatePrompt.concat(promptTime,promptReq)
            navigator.clipboard.writeText(finalPrompt)
                .then(e=>console.log("Ok"))
                .then(copyMessage.textContent="Copiado")
                .catch(e=>console.log("Failed"))
                .catch(e=>copyMessage.textContent="Error")
        }

        function setupEventListeners() {
            const itemsList = document.getElementById('itemsList');
            const copyMessage = document.getElementById('copyMessage');
            // Event delegation for dynamic elements
            itemsList.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox' || 
                    e.target.classList.contains('complexity-select') || 
                    e.target.classList.contains('quantity-input')) {
                    updateTotals();
                    copyMessage.textContent="";

                    
                }
            });

            const button = document.getElementById("create-prompt");
            button.addEventListener("click",createPrompt);

            // Summary section inputs
            ['buffer', 'teamSize', 'dedication'].forEach(id => {
                document.getElementById(id).addEventListener('input', updateTotals);
            });
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', () => {
            initializeItems();
            setupEventListeners();
            updateTotals();
        });

