"use client";
// npm install react-hook-form
// npm i yup
// npm i @hookform/resolvers
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IForm {
  name: string;
  image: string;
  author: string;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  image: Yup.string().email("Input a valid e-mail").required("Email is required"),
  author: Yup.string().required("Author is required"),
});

export default function Form() {
  const router = useRouter();
  // O Hook useForm devolve um objeto que contém múltiplos valores ou métodos.
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>({ resolver: yupResolver(formSchema) });

  // const onSubmit = () => alert("Livro adicionado!");
  // const onError = () => alert("Por favor, verifique as informações.");

  const onSubmit: SubmitHandler<IForm> = async () => {
    //getValues para obter todos os dados e fazer o post
    const values = getValues();
    await fetch("/api/create", {
      method: "POST",
      body: JSON.stringify(values),
    });
    router.push("/products");
  };

  const onError: SubmitErrorHandler<IForm> = () => alert("Please, check your info");

  return (
    <div>
      {/* o método handleSubmit servirá para tratar do envio de dados do nosso formulário, o qual suporta dois parâmetros, ambos funções. 
A primeira é a que será invocada se todos os campos do formulários forem preenchidos sem erros. Caso contrário, a segunda função será invocada.
 */}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>Name</label>
        {/* O método register nos ajudará a rastrear as alterações de um determinado input, associando-o a um nome. Cada input deve estar identificado com um nome único, que será o que será passado como parâmetro para a nossa função register. */}
        <input type="text" {...register("name", { required: true, maxLength: 30 })} />
        {errors.name?.type === "required" && <span style={{ fontSize: "small", color: "rebeccapurple" }}>First Name is required</span>}
        {errors.name?.type === "maxLength" && <span style={{ fontSize: "small", color: "rebeccapurple" }}>The max Length is 30 characters</span>}
        <br />
        <br />

        <label>Image</label>
        <input type="text" {...register("image", { required: true })} />
        {errors.image && <span style={{ fontSize: "small", color: "rebeccapurple" }}>Please upload an image</span>}
        <br />
        <br />

        <label>Author</label>
        <input type="text" {...register("author", { required: "Author is required" })} />
        <span style={{ fontSize: "small", color: "rebeccapurple" }}>{errors.author?.message}</span>
        <br />
        <br />

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
