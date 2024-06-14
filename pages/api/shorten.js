// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase from '../../utils/supabase.js';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const id = nanoid(6);
    const created_at = new Date().toISOString();
    var views 

    // For the database
    const { error } = await supabase
      .from("links")
      .insert([{ id, url, created_at, views:0 }]);

    if (error) {
      res.status(500).json({ error: error.message });
      return; 
    }
    const shortUrl = `${req.headers.host}/${id}`;
    res.status(200).json({ shortUrl }); 
  } else {
    res.status(405).send('Method not allowed');
  }
}