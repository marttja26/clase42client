import { useForm } from 'react-hook-form';

const ProductForm = ({ saveItem }) => {
	const { register, handleSubmit, reset } = useForm();

	const handleSave = (data) => {
		saveItem(data);
		reset();
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleSave)}>
				<h2>Completa el formulario para subir un producto.</h2>
				<div>
					<label htmlFor="name">Nombre</label>
					<input
						{...register('name', { required: true })}
						placeholder="Escriba el nombre del producto aqui"
					/>
				</div>
				<div>
					<label htmlFor="price">Precio</label>
					<input
						type="number"
						{...register('price', { valueAsNumber: true, required: true })}
						placeholder="Escriba el precio del producto aqui"
					/>
				</div>
				<div>
					<label htmlFor="brand">MARCA</label>
					<input
						type="text"
						{...register('brand', { required: true })}
						placeholder="Escriba la marca del producto aqui"
					/>
				</div>
				<div>
					<label htmlFor="img">Foto del Producto</label>
					<input
						type="text"
						{...register('img', { required: true })}
						placeholder="Sube el link de la imagen del producto aqui"
					/>
				</div>
				<div>
					<label htmlFor="description">Descripcion</label>
					<input
						type="text"
						{...register('description', { required: true })}
						placeholder="Escriba una breve descripcion del producto aqui"
					/>
				</div>
				<div>
					<label htmlFor="category">Categoria</label>
					<input
						type="text"
						{...register('category', { required: true })}
						placeholder="Escriba la categoria del producto aqui"
					/>
				</div>
				<button type="submit">Agregar el Producto.</button>
			</form>
		</>
	);
};

export default ProductForm;
