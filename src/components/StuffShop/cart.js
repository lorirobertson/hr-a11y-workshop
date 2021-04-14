import _ from 'lodash';

const utils = {
    getCart: () => {
        let cart = localStorage.getItem('cart');
        return ( cart && cart.length ) ?  JSON.parse(cart) : [];
    },

    updateItem: (item) => {
        let cart = utils.getCart();
        let matchedIndex = _.findIndex(cart, {id: item.id, color: item.color});

        if ( matchedIndex > -1 ){
            cart[matchedIndex].quantity = item.quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        return utils.getCart();
    },

    saveItem: (data) => {
        let cart = utils.getCart();

        // Validate that the cart is an array and has items
        if( _.isArray(cart) && cart.length ) {
            // check for duplicate items. If dupe sum existing and new quantities.
            let matchedIndex = _.findIndex(cart, {id: data.id, color: data.color});
            if ( matchedIndex > -1 ){
                cart[matchedIndex].quantity += data.quantity;
            } else {
                cart.push(data);
            }
        } else {
            cart.push(data);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        return utils.getCart();
    }
}


const cart = {
    toggle: () => {
        let cart = document.getElementById('shopping-cart');
        cart.classList.toggle('open');
    },

    get: () => {
        return new Promise((resolve, reject) => {
            try {
                let cart = utils.getCart();
                resolve(cart);
            }
            catch(err) {
                reject(err);
            }
        });
    },

    add: (item) => {
        return new Promise((resolve, reject) => {
            try {
                let cart = utils.saveItem(item);
                resolve(cart);
            }
            catch(err) {
                reject(err);
            }
        });
    },

    update: (item) => {
        return new Promise((resolve, reject) => {
            try {
                let cart = utils.updateItem(item);
                resolve(cart);
            }
            catch(err) {
                reject(err);
            }
        });
    },

    remove: (item) => {
        return new Promise((resolve, reject) => {
            try {
                let cart = utils.getCart()
                    .filter((i)=>{
                        return !(i.id === item.id && i.color === item.color);
                    });
                
                localStorage.setItem('cart', JSON.stringify(cart));

                resolve(cart);
            }
            catch(err) {
                reject(err);
            }
        });
    }
}

export default cart;