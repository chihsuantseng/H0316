


require('dotenv').config();


const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

//let liffId = "2007067558-PaEYb4om"; // 在這裡填入你的 LIFF ID
let orderItemCount = 1;

// 初始化 LIFF SDK
function initializeLiff() {
    liff.init({ liffId: liffId })
        .then(() => {
            console.log('LIFF 初始化成功');
            if (liff.isLoggedIn()) {
                console.log('用戶已登入');
            } else {
                console.log('用戶尚未登入，將執行登入');
                // 強制執行登入
                liff.login();
            }
        })
        .catch((error) => {
            console.error('LIFF 初始化失敗', error);
        });
}

// 新增商品
function addItem() {
    const container = document.getElementById('order-items-container');
    const newItem = document.createElement('div');
    newItem.classList.add('order-item');
    newItem.id = `item-${orderItemCount}`;
    newItem.innerHTML = `
        <label for="product-${orderItemCount}">選擇商品：</label>
        <select id="product-${orderItemCount}">
            <option value="醫療耗材A">醫療耗材A</option>
            <option value="醫療耗材B">醫療耗材B</option>
            <option value="醫療耗材C">醫療耗材C</option>
        </select>
        <label for="quantity-${orderItemCount}">數量：</label>
        <input type="number" id="quantity-${orderItemCount}" value="1" min="1" />
        <button type="button" onclick="removeItem(${orderItemCount})">刪除商品</button>
    `;
    container.appendChild(newItem);
    orderItemCount++;
}

// 刪除商品
function removeItem(index) {
    const itemToRemove = document.getElementById(`item-${index}`);
    itemToRemove.remove();
}

// 顯示訂單明細
function showOrder() {
    let orderDetails = '';
    for (let i = 0; i < orderItemCount; i++) {
        const product = document.getElementById(`product-${i}`).value;
        const quantity = document.getElementById(`quantity-${i}`).value;
        orderDetails += `商品：${product}\n數量：${quantity}\n\n`;
    }
    document.getElementById("order-details").innerText = orderDetails;

    // 顯示訂單摘要區塊
    document.getElementById("order-summary").style.display = "block";
}

// 發送訂單訊息到 LINE 聊天
function sendOrder() {
    let orderMessage = '訂單資訊：\n';
    for (let i = 0; i < orderItemCount; i++) {
        const product = document.getElementById(`product-${i}`).value;
        const quantity = document.getElementById(`quantity-${i}`).value;
        orderMessage += `商品：${product}\n數量：${quantity}\n`;
    }

    console.log('送出訂單前，檢查登入狀態');
    console.log('liff.isLoggedIn() 狀態：', liff.isLoggedIn());

    if (liff.isLoggedIn()) {
        console.log('用戶已登入');
        liff.sendMessages([{
            type: 'text',
            text: orderMessage
        }])
        .then(() => {
            alert('訂單已送出！');
            liff.closeWindow(); //  關閉 LIFF 頁面
        })
        .catch((error) => {
            console.error('發送訂單失敗', error);
        });
    } else {
        console.log('用戶尚未登入，將顯示登入提示');
        alert('請先登入 LINE');
    }
}

// 頁面載入時初始化 LIFF
window.onload = function() {
    initializeLiff();
};