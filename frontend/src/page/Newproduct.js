import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BsCloudUpload } from "react-icons/bs"
import { ImagetoBase64 } from '../utility/imagetoBase64'

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    price: "",
    description: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      }
    })
  }

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)

    const { name, image, category, price } = data

    if (name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const fetchRes = await fetchData.json()

      console.log(fetchRes)
      toast(fetchRes.message)

      setData(() => {
        return {
          name: "",
          brand: "",
          category: "",
          image: "",
          price: "",
          description: ""
        }
      })
    }
    else {
      toast("Enter required Fields")
    }

  }
  return (
    <div className=' p-4 '>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white ' onSubmit={handleSubmit} >
        <label htmlFor='name'>Name</label>
        <input type={"text"} name="name" className=' bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name} />

        <label htmlFor='brand'>Brand</label>
        <select className=' bg-slate-200 p-1 my-1' id='brand' name='brand' onChange={handleOnChange} value={data.brand} >
          <option value={"other"}>select brand</option>
          <option value={"marvel"}>Marvel</option>
          <option value={"x-men"}>X-Men</option>
          <option value={"dc"}>DC</option>
          <option value={"naruto"}>Naruto</option>
          <option value={"pokemon"}>Pokemon</option>
          <option value={"others"}>Others</option>
        </select >

        <label htmlFor='category'>Category</label>
        <select className=' bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category} >
          <option value={"other"}>select category</option>
          <option value={"upper garment"}>Upper Garment</option>
          <option value={"lower garment"}>Lower Garment</option>
          <option value={"footwear"}>Footwear</option>
          <option value={"watch"}>Watch</option>
          <option value={"mobile cover"}>Mobile Cover</option>
          <option value={"comic book"}>Comic Book</option>
          <option value={"sticker"}>Sticker</option>
          <option value={"others"}>Others</option>
        </select >

        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer '>
            {
              data.image ? <img src={data.image} className='h-full' /> : <spam className=" text-5xl "><BsCloudUpload /></spam>
            }


            <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className='hidden' />
          </div>
        </label>

        <label htmlFor='price' className=' my-1 '>Price</label>
        <input type={"text"} className=' bg-slate-200 p-1 my-1 ' name='price' onChange={handleOnChange} value={data.price} />

        <label htmlFor='description'>Description</label>
        <textarea rows={2} value={data.description} className=' bg-slate-200 p-1 my-1 resize-none ' name='description' onChange={handleOnChange} ></textarea>

        <button className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div >
  )
}

export default Newproduct