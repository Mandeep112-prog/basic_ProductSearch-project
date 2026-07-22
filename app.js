
let btn = document.querySelector("button");

btn.addEventListener("click",async ()=>{
    let search = document.querySelector("#search").value.trim();
    console.log(search);
    let products = await getProducts(search);
    if (search === "") return;
   showProducts(products);
   document.querySelector("#search").value = "";
   
   
});

function showProducts(products) {

    let container = document.querySelector("#products");

    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `
            <h3 class="text-center text-danger">
                No Products Found
            </h3>
        `;
        return;
    }

    for (let product of products) {

        container.innerHTML += `
        
        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow">

                <img src="${product.thumbnail}"
                     class="card-img-top"
                     style="height:250px; object-fit:cover;">

                <div class="card-body">

                    <h5 class="card-title">
                        ${product.title}
                    </h5>

                    <p class="text-muted">
                        <strong>Brand:</strong> ${product.brand}
                    </p>

                    <span class="badge bg-primary">
                        ${product.category}
                    </span>

                    <h4 class="text-success mt-3">
                        ₹${(product.price * 87).toLocaleString("en-IN")}
                    </h4>

                    <p>
                        ⭐ ${product.rating}
                    </p>

                    <p>
                        📦 Stock: ${product.stock}
                    </p>

                    <p>
                        ${product.description.substring(0,80)}...
                    </p>

                </div>

            </div>

        </div>

        `;
    }
}

// function showProducts(products){
//     let list = document.querySelector("#list");
//     if(products.length == 0){
//         let li = document.createElement("li");
//         li.innerText = "No product found!";
//         list.appendChild(li);
//     }
//     for(product of products){
//         console.log(product.title);
//         let li = document.createElement("li");
//         li.innerText = product.title;
//         list.appendChild(li);
//     }

// };

async function getProducts(search){

    try{

        let res = await axios.get(
            `https://dummyjson.com/products/search?q=${search}`
        );

        return res.data.products;

    }

    catch(err){

        console.log(err);

        return [];

    }

}