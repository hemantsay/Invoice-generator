document.addEventListener('DOMContentLoaded', () => {

    const addItemButton = document.getElementById('add-item');
    const itemContainer = document.getElementById('items');
    const invoicePreview = document.getElementById('invoice-preview');
    const invoiceDetails = document.getElementById('invoice-details');


    // add item when button clicked

    addItemButton.addEventListener('click', () => {

        const itemRow = document.createElement('div');

        itemRow.classList.add('item');

        itemRow.innerHTML = `<input type="text" placeholder="Description" class="description" required>
                <input type="number" placeholder="Qty" class="quantity" min="1"  required>
                <input type="number" placeholder="Price" class="price" step="0.01" min="0"  required>
                <button class = "delete-button">Delete</button>`;

        itemContainer.appendChild(itemRow);

        // delete item row

        const deletItemButton = itemRow.querySelector('.delete-button');

        deletItemButton.addEventListener('click', () => {
            itemContainer.removeChild(itemRow);
        })

    })

    // for generating invoice
    const form = document.getElementById('invoice');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // get company details

        const companyName = document.getElementById('company-name').value;
        const companyContact = document.getElementById('Company-contact').value;
        const gstNo = document.getElementById('gst-no').value;

        // get customer details
        const customerName = document.getElementById('customer-name').value;
        const customerContact = document.getElementById('mobile-no').value;
        const customerAddress = document.getElementById('customer-address').value;
        const invoiceNo = document.getElementById('invoice-no').value;

        const date = document.getElementById('date').value;



        // company logo input

        const companyLogoInput = document.getElementById('company-logo')
        const companyLogoFile = companyLogoInput.files[0];

        let companyLogoUrl = '';
        if (companyLogoFile) {
            companyLogoUrl = URL.createObjectURL(companyLogoFile);
        }

        // add items

        const items = [];
        document.querySelectorAll('.item').forEach((row) => {
            const description = row.querySelector('.description').value;
            const qty = parseFloat(row.querySelector('.quantity').value);
            const price = parseFloat(row.querySelector('.price').value);

            const total = qty * price;

            items.push({ description, qty, price, total });
            console.log(items);
        })


        let invoiceHTML = `
        <div class="container" style="display: flex; align-items: center; gap: 20px; padding: 20px; border-bottom: 2px solid #333;">
            ${companyLogoUrl ? `<img src="${companyLogoUrl}" alt="Logo" style="max-height: 80px; border: 1px solid #ccc; padding: 5px;">` : ''}
            <div style="flex-grow: 1;">
                <h2 style="margin: 0; font-size: 1.5em; color: #333;">${companyName}</h2>
                <p style="margin: 5px 0; font-size: 0.9em; color: #555;">Phone: ${companyContact}</p>
                <p style="margin: 0; font-size: 0.9em; color: #555;">GST No: ${gstNo}</p>
            </div>
        </div>
        <div style="padding: 20px;">
            <h3 style="margin: 0; font-size: 1.2em; color: #444;">Invoice Details</h3>
            <p style="margin: 5px 0; font-size: 0.9em; color: #555;">Invoice No: <strong>${invoiceNo}</strong></p>
            <p style="margin: 0; font-size: 0.9em; color: #555;">Date: ${date}</p>
            <h3 style="margin-top: 20px; font-size: 1.2em; color: #444;">Client Information</h3>
            <p style="margin: 0; font-size: 0.9em; color: #555;">Name: <strong>${customerName}</strong></p>
            <p style="margin: 0; font-size: 0.9em; color: #555;">Address: <strong>${customerAddress}</strong></p>
            <p style="margin: 0; font-size: 0.9em; color: #555;">Phone no: <strong>${customerContact}</strong></p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9em;">
            <thead>
                <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ccc; text-align: left;">
                    <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                    <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
                </tr>
            </thead>
            <tbody>
    `;

        let grandTotal = 0;

        items.forEach((item) => {
            invoiceHTML += `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.description}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${item.qty}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${item.total.toFixed(2)}</td>
            </tr>
        `;
            grandTotal += item.total;
        });

        invoiceHTML += `
            </tbody>
        </table>
        <div style="text-align: right; padding: 20px;">
            <h4 style="font-size: 1.2em; color: #333;">Grand Total: ₹${grandTotal.toFixed(2)}</h4>
        </div>
    `;



        invoiceDetails.innerHTML = invoiceHTML;
        invoicePreview.style.display = 'block';


    })


    




})

document.getElementById('print-button').addEventListener('click', () => {
    const printSection = document.getElementById('print-section').innerHTML;

    // Open a new window for printing
    const printWindow = window.open('', '', 'width=800,height=600');

    // Write the content you want to print into the new window
    printWindow.document.open();
    printWindow.document.write(`
        <html>
            <head>
                <title>Print</title>
                
            </head>
            <body>
                ${printSection}
            </body>
        </html>
    `);
    printWindow.document.close();

    // Print the content
    printWindow.print();

    // Close the print window (optional)
    printWindow.close();
});
