import { useEffect, useState } from 'react';
import Product from '../components/Product';
const Products = () => {
	const [products, setProducts] = useState([]);
	const [querys, setQuerys] = useState({});

	const [checked, setChecked] = useState({});

	const handleChecked = (value) => {
		if (!checked[value]) {
			setChecked((prev) => ({ ...prev, ...{ [value]: true } }));
		} else {
			setChecked((prev) => {
				const obj = { ...prev };
				obj[value] = !obj[value];
				return obj;
			});
		}
	};

	const handleFilter = (key, value) => {
		if (!querys.hasOwnProperty(key)) {
			const query = { [key]: value };
			setQuerys((prev) => ({ ...prev, ...query }));
		} else {
			if (!checked[value]) {
				if (key === 'order') {
					setQuerys((prev) => {
						let query = { ...prev };
						query[key] = value;
						return query;
					});
				} else {
					setQuerys((prev) => {
						let query = { ...prev };
						query[key] = `${query[key]},${value}`;
						return query;
					});
				}
			} else {
				setQuerys((prev) => {
					let query = { ...prev };
					Object.keys(query).forEach((key) => {
						let stringKey = query[key].split(',');
						let newArray = stringKey.filter((word) => value !== word);
						if (newArray < 1) {
							delete query[key];
						} else {
							query[key] = newArray.toString();
						}
					});
					return query;
				});
			}
		}
	};
	useEffect(() => {
		const queryString = new URLSearchParams(querys).toString();
		fetch(`http://localhost:8080/productos?${queryString}`, {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				setProducts(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [querys]);

	const [filter, setFilter] = useState({});
	useEffect(() => {
		fetch(`http://localhost:8080/productos/querys`, {
			method: 'GET',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				setFilter(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return products ? (
		<>
		<h3 className=' m-auto'>FILTROS.</h3>
		<div className='flex'>
		<div className='flex m-12 w-1/2'>
			<div className=' w-1/3'>
			<button
				className=''
				onClick={() => {
					setQuerys({});
				}}
			>
				Limpiar Filtros
			</button>
			</div>
			<div className=' w-1/3'>
			<input
				type="radio"
				name="order"
				value="OrderByPriceDESC"
				onChange={(e) => {
					handleFilter(e.target.name, e.target.value);
				}}
			/>
			Ordenar por precio mas Alto.
			</div>
			<div className=' w-1/3'>
			<input
				type="radio"
				name="order"
				value="OrderByPriceASC"
				onChange={(e) => {
					handleFilter(e.target.name, e.target.value);
				}}
			/>
			Ordenar por precio mas Bajo.
			</div>
			</div>
			<div className='flex flex-row  w-1/2'>
			{Object.keys(filter).map((key, i) => {
				return (
					<div className='w-2/4' key={i}>
						<p className=' text-xl'>{key.toUpperCase()}</p>
						{filter[key].map((value, i) => (
							<div className='' key={i}>
								<p className=''>{value}</p>
								<input
									onChange={() => {
										handleChecked(value);
										handleFilter(key, value);
									}}
									type="checkbox"
									name={key}
									value={value}
								/>
							</div>
						))}
					</div>
				);
			})}</div>
			</div>
			<div className="flex flex-auto flex-col p-5 bg-white"> 
			{products.map((product) => {
				return <Product key={product._id} product={product} />;
			})}
			</div>
		</>
	) : (
		<h1>No hay productos.</h1>
	);
};

export default Products;
