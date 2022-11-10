import { useEffect, useState } from 'react';
import AdminProduct from '../components/AdminProduct';
import ProductForm from '../components/ProductForm';
const AdminView = () => {
	const [products, setProducts] = useState([]);
	const [refresh, setRefresh] = useState(false);
    const [info, setInfo] = useState([]);


	useEffect(() => {
		fetch(`http://localhost:8080/productos`, {
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
	}, [refresh]);

	const removeItem = async (body) => {
		await fetch('http://localhost:8080/productos', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				setRefresh(prevState => !prevState);
                setInfo(res);
				setTimeout(() => {
					setInfo('');
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

    const updateItem = async (body) => {
        await fetch('http://localhost:8080/productos', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				setRefresh(prevState => !prevState);
                setInfo(res);
				setTimeout(() => {
					setInfo('');
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
			});
    }

    const saveItem = async (body) => {
		await fetch('http://localhost:8080/productos', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				setInfo(res);
				setRefresh(prevState => !prevState);
				setTimeout(() => {
					setInfo('');
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return products ? (
		<>
			<ProductForm saveItem={saveItem}></ProductForm>

			<div className="flex flex-auto flex-col p-5 bg-white">
                <span>{info}</span>
				{products.map((item, i) => (
					<AdminProduct item={item} key={i} removeItem={removeItem} updateItem={updateItem}/>
				))}
			</div>
		</>
	) : (
		<>
			<ProductForm saveItem={saveItem}></ProductForm>
			<h1>No hay productos.</h1>
		</>
	);
};

export default AdminView;
