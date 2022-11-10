import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AdminProduct = ({ item, removeItem, updateItem }) => {
	const [editableView, setEditableView] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: item
    });

	const handleUpdate = (data) => {
        updateItem(data)
        setEditableView(false)
    }
	return (
		<div className="flex flex-col gap-5 items-center p-5 justify-evenly border lg:flex-row xl:w-4/5 xl:mx-auto">
			{!editableView ? (
				<div className="flex flex-col gap-5 items-center lg:gap-10 lg:flex-row">
					<img
						src={item.img}
						className="w-[200px] h-[200px] m-auto"
						alt=""
					></img>
					<p className="lg:w-[20rem] text-center font-bold hover:underline">
						Producto: {item.name}
					</p>
					<p className="text-sm">Precio: ${item.price}</p>
					<p className="text-sm">Marca: {item.brand}</p>
					<p className="text-sm">Descripcion: {item.description}</p>
					<p className="text-sm">Categoria: {item.category}</p>{' '}
				</div>
			) : (
				<div className="flex flex-col gap-5 items-center lg:gap-10 lg:flex-row">
					<img
						src={item.img}
						className="w-[200px] h-[200px] m-auto"
						alt=""
					></img>
					<form onSubmit={handleSubmit(handleUpdate)}>
						<div>
							<label htmlFor="img"> Imagen del Producto </label>
							<input {...register('img', { required: true })} />
						</div>
						<div>
							<label htmlFor="name"> Producto </label>
							<input {...register('name', { required: true })} />
						</div>
						<div>
							<label htmlFor="price"> Precio </label>
							<input {...register('price', { valueAsNumber: true, required: true })} />
						</div>
						<div>
							<label htmlFor="brand"> Marca </label>
							<input {...register('brand', { required: true })} />
						</div>
						<div>
							<label htmlFor="description"> Descripcion </label>
							<input {...register('description', { required: true })} />
						</div>
						<div>
							<label htmlFor="category"> Category </label>
							<input {...register('category', { required: true })} />
						</div>
						<button>Editar</button>
					</form>
				</div>
			)}
			<button
				onClick={() => {
					removeItem(item);
				}}
			>
				Borrar
			</button>
			<button
				onClick={() => {
					setEditableView((prevState) => !prevState);
				}}
			>
				{!editableView ? 'Editar' : 'Cancelar'}
			</button>
		</div>
	);
};

export default AdminProduct;
