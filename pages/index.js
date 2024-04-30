"use client"
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);


  const handleClick = async (event) => {
    event.preventDefault();
    try {
      //my toaster
      toast.success('Link generated successfully!', {
        style: {
            borderRadius: '10px',
            background: 'green',
            color: 'white',
          }})

      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data);
      if (data.shortUrl) {
        setLinks([...links, { id: data.shortUrl, url: `/${data.shortUrl.split('/').pop()}` }]);
        console.log('Links state updated:', links);
      } else {
        console.error('No shortUrl in response:', data);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  }

  const handleCopy = (linkId) =>{
    navigator.clipboard.writeText(linkId)
    .then(() => {
      toast.success('Link Copied!',{
        style: {     borderRadius: '10px',     background: 'green',    color: 'white',   }})
    })
    .catch(() => {
      toast.error('Error copying link'),{
        style: {     borderRadius: '10px',     background: 'red',    color: 'white',   }}
    })
    ;
  }
  
  return (
    <div className='flex flex-col mt-44 items-center h-screen w-screen'>
      <h2 className='flex justify-center text-red-400 font-roboto font-medium text-4xl'><span className='text-blue-500'>shortl</span>.y</h2>
      <h3 className='text-gray-700 '>Turn any Url into short links  </h3>
    <form  className='flex flex-col mt-20 items-center ' >
      <input 
          className='text-black bg-gray-100 border-solid border-2 border-gray-200  py-3 rounded-md mb-2 w-96 '
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a Url"
          required
      />
    </form>
    <button 
        className='bg-blue-500 text-white font-light rounded-md py-3 mb-24 w-full max-w-96'
        type="button"
        onClick={handleClick}
        disabled={!url}
        >
          Generate Link
    </button>
        
    {links.map((link) =>{
      return(
      <div key={link.id} className=" bg-green-400 border rounded-md p-4 w-full max-w-96 "> 
        <div className='flex items-center'> 
            <img src="./component/link.png" height="20" width="20" />
            <p className='text-black text-sm ml-5 mt-1 mb-1 text-wrap' >Your link has been generated</p>
        </div>
      <a className='text-blue-500 underline text-md ml-10' href={link.url}> {link.id}</a>
      <p className="text-black flex justify-end items-center text-sm">
        <button className="focus:outline-none" onClick={() => handleCopy(link.id)} >Copy</button>
        <img src="./component/copy.png" height="10" width="12" className="ml-1" />
      </p>
      </div>)
    })}
     <Toaster />
    </div>
  );
}