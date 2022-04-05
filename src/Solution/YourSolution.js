import '../AdditionalFiles/App.css';
import * as React from 'react';

//This is the API url to fetch from
const API_URL = 'https://matchesfashion.com/api/products';

function YourSolution() {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [page, setPage] = React.useState(0);

	React.useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			await fetch(`${API_URL}?page=${page}`).then((response) => {
				response.json().then((data) => {
					setProducts(data.products);
					setLoading(false);
				});
			});
		};
		fetchProducts();
	}, [page]);

	const handlePageChange = (e) => {
		if (e.target.innerText === 'Next Page') {
			setPage(page + 1);
		} else if (e.target.innerText === 'Previous Page') {
			setPage(page - 1);
		} else if (e.target.innerText === 'First Page') {
			setPage(0);
		} else if (e.target.innerText === 'Last Page') {
			setPage(5);
		}
	};

	return (
		<div className="App">
			<div>
				<h1>React tech test- Joseph Waddicor</h1>
			</div>
			<table id="products">
				<thead>
					<tr>
						<th>Id</th>
						<th>Brand</th>
						<th>Name</th>
						<th>Quantity Sold</th>
						<th>Sold Price</th>
						<th>Cost To Business</th>
						<th>Profit After Tax</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => {
						return (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.brand}</td>
								<td>{product.name}</td>
								<td>{product.quantitySold}</td>
								<td>£{product.soldPrice}</td>
								<td>£{product.costToBusiness}</td>
								<td>
									£
									{product.quantitySold > 10
										? (
												(product.soldPrice - product.costToBusiness) * 10 +
												(product.soldPrice - product.costToBusiness) *
													(product.quantitySold - 10) *
													0.92
										  )
												.toFixed(2)
												.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
										: (product.soldPrice - product.costToBusiness) *
										  product.quantitySold}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<button disabled={page === 0} onClick={(e) => handlePageChange(e)}>
				First Page
			</button>
			<button disabled={page === 0} onClick={(e) => handlePageChange(e)}>
				Previous Page
			</button>
			<button disabled={page === 5} onClick={(e) => handlePageChange(e)}>
				Next Page
			</button>
			<button disabled={page === 5} onClick={(e) => handlePageChange(e)}>
				Last Page
			</button>
		</div>
	);
}

export default YourSolution;
