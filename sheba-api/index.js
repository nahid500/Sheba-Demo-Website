const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@trial1.1tkz1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



// const SSLCommerzPayment = require('sslcommerz-lts')
// const store_id = process.env.STORE_ID
// const store_passwd = process.env.STORE_PASSWD
// const is_live = process.env.IS_LIVE  //true for live, false for sandbox


// Connect to MongoDB and start the server
async function startServer() {
  try {
    await client.connect();
    console.log('MongoDB Connected');

    const usersCollection = client.db("sheba").collection("users");
    const categoriesCollection = client.db("sheba").collection("categories");
    const slotsCollection = client.db("sheba").collection("slots");
    const servicesCollection = client.db("sheba").collection("services");
    const staffsCollection = client.db("sheba").collection("stafss");
    const bookingsCollection = client.db("sheba").collection("bookings")

    // Define route for creating a user
    app.post('/user', async (req, res) => {
      try {
        const user = req.body;

        const isUserExist = Boolean(await usersCollection.findOne({email: req.body.email}))

        if(isUserExist){
          res.send({
            status: false,
            message: "Email already registered"
          })
        }
        else{
          
          const result = await usersCollection.insertOne(user);
          res.send({
            status: true,
            message: "User Created",
            user
          });
        }

      } catch (err) {
        res.send({
          status: false,
          message: "Error occurred"
        });
      }
    });
    
    //Login
    app.post('/login', async(req, res) => {

      const{email, password} = req.body


      const user = await usersCollection.findOne({email: email,password})

      user?
      res.send({
        status: true,
        message: 'Logged in Successfully',
        user
      })
      :res.send({
        status:false,
        message: "Your credentials dont match"
      })


    })

    app.get('/user/:id', async(req,res) =>{

      const id = req.params.id

        try{
            const user = await usersCollection.findOne({
              _id: new ObjectId(id)
            })
            user ? res.send({
              status:true,
              user
            }) :
            res.send({
              status:false,
              message: "User not Found"
          })

        }
        catch(err){
         res.send({
          status: false,
          message:"An Error occured",
          
         })
         console.log(err)

      }


    })

    app.patch('/user/:id', async (req, res) => {
      try {
        const id = req.params.id;

        // Ensure req.body is a valid JavaScript object
        // if (typeof req.body !== 'object' || req.body === null) {
        //   return res.send({
        //     status: false,
        //     message: "Invalid update data"
        //   });
        // }

        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );

        if (result.matchedCount > 0) {
          res.send({
            status: true,
            message: "Updated successfully"
          });
        } else {
          res.send({
            status: false,
            message: "No matching user found to update"
          });
        }
      } catch (err) {
        res.send({
          status: false,
          message: "An Error occurred",
          error: err.message
        });
      }
    });
     
    app.delete('/user/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const objectId = new ObjectId(id);
    
        const result = await usersCollection.deleteOne({ _id: objectId });
    
        if (result.deletedCount > 0) {
          res.send({
            status: true,
            message: "User Deleted"
          });
        } else {
          res.send({
            status: false,
            message: "User not found"
          });
        }
      } catch (err) {
        res.send({
          status: false,
          message: "An error occurred",
          error: err.message
        });
      }
    });
    
    app.get('/users', async(req,res)=>{
      try{
        const users = await usersCollection.find({}).toArray()

        users.length>0 ? res.send({
          status: true,
          message: "Users fetched successfully",
          users
        }):
        res.send({
          status:true,
          message:"No users found"
        })

      }
      catch(err){
        err && res.send({
          status: false,
          message: "An error occurred"
        })        
      }

    })

    // Define route for health check
    app.get('/', (req, res) => {
      res.send({
        status: true,
        message: "Server is up and running"
      });
    });

//categories
    app.post('/category', async (req, res) => {
      try {
          const category = req.body;

          const isCategoryExist = Boolean(await categoriesCollection.findOne({name: category.name}))

          // console.log(req.body.name);
          
          // console.log(isCategoryExist);
          
          if(isCategoryExist){
            res.send({
              status: false,
              message: "Category already registered"
            })
          }

          else{  
            const result = await categoriesCollection.insertOne(category);
            res.send({
              status: true,
              message: "Category Created",
              category
            });
          }

      } catch (err) {
        res.send({
          status: false,
          message: "Error occurred"
        });
      }
    });
    
    app.delete('/category/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const objectId = new ObjectId(id);
    
        const result = await categoriesCollection.deleteOne({ _id: objectId });
    
        if (result.deletedCount > 0) {
          res.send({
            status: true,
            message: "category Deleted"
          });
        } else {
          res.send({
            status: false,
            message: "category not found"
          });
        }
      } catch (err) {
        res.send({
          status: false,
          message: "An error occurred",
          error: err.message
        });
      }
    });

    app.get('/categories', async(req,res)=>{
      try{
        const category = await categoriesCollection.find({}).toArray()

        category.length>0 ? res.send({
          status: true,
          message: "Categories fetched successfully",
          category
        }):
        res.send({
          status:true,
          message:"No categories found"
        })

      }
      catch(err){
        err && res.send({
          status: false,
          message: "An error occurred"
        })        
      }

    })

    app.get('/category/:id', async(req,res) =>{

      const id = req.params.id

        try{
            const categories = await categoriesCollection.findOne({
              _id: new ObjectId(id)
            })
            categories ? res.send({
              status:true,
              categories
            }) :
            res.send({
              status:false,
              message: "Category not Found"
          })

        }
        catch(err){
         res.send({
          status: false,
          message:"An Error occured",
          
         })
         console.log(err)

      }


    })

    app.patch('/category/:id', async (req, res) => {
      try {
        const id = req.params.id;

        const result = await categoriesCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );

        if (result.matchedCount > 0) {
          res.send({
            status: true,
            message: "Category Updated successfully"
          });
        } else {
          res.send({
            status: false,
            message: "No matching category found to update"
          });
        }
      } catch (err) {
        res.send({
          status: false,
          message: "An Error occurred",
          error: err.message
        });
      }
    });

///slots

app.post('/slot', async (req, res) => {
  try {
    const slot = req.body;
      
      await slotsCollection.insertOne(slot);
      res.send({
        status: true,
        message: "Slot Created",
        slot
      });
    
  } catch (err) {
    res.send({
      status: false,
      message: "Error occurred"
    });
  }
});

app.get('/slot/:id', async(req,res) =>{

  const id = req.params.id

    try{
        const slot = await slotsCollection.findOne({
          _id: new ObjectId(id)
        })
        slot ? res.send({
          status:true,
          slot
        }) :
        res.send({
          status:false,
          message: "Slot not Found"
      })

    }
    catch(err){
     res.send({
      status: false,
      message:"An Error occured",
      
     })
     console.log(err)

  }


})

app.patch('/slot/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await slotsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount > 0) {
      res.send({
        status: true,
        message: "Slot Updated successfully"
      });
    } else {
      res.send({
        status: false,
        message: "No matching slot found to update"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An Error occurred",
      error: err.message
    });
  }
});
 
app.delete('/slot/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const result = await slotsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.send({
        status: true,
        message: "Slot Deleted"
      });
    } else {
      res.send({
        status: false,
        message: "Slot not found"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An error occurred",
      error: err.message
    });
  }
});

app.get('/slots', async(req,res)=>{
  try{
    const slots = await slotsCollection.find({}).toArray()

    slots.length>0 ? res.send({
      status: true,
      message: "Slots fetched successfully",
      slots
    }):
    res.send({
      status:true,
      message:"No slots found"
    })

  }
  catch(err){
    err && res.send({
      status: false,
      message: "An error occurred"
    })        
  }

})

//services
app.post('/service', async (req, res) => {
  try {
    const service = req.body;
      
      await servicesCollection.insertOne(service);
      res.send({
        status: true,
        message: "Service Created",
        service
      });
    
  } catch (err) {
    res.send({
      status: false,
      message: "Error occurred"
    });
  }
});

app.get('/service/:id', async(req,res) =>{

  const id = req.params.id

    try{
        const service = await servicesCollection.findOne({
          _id: new ObjectId(id)
        })
        service ? res.send({
          status:true,
          service
        }) :
        res.send({
          status:false,
          message: "service not Found"
      })

    }
    catch(err){
     res.send({
      status: false,
      message:"An Error occured",
      
     })
     console.log(err)

  }


})

app.patch('/service/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await servicesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount > 0) {
      res.send({
        status: true,
        message: "service Updated successfully"
      });
    } else {
      res.send({
        status: false,
        message: "No matching service found to update"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An Error occurred",
      error: err.message
    });
  }
});
 
app.delete('/service/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const result = await servicesCollection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.send({
        status: true,
        message: "service Deleted"
      });
    } else {
      res.send({
        status: false,
        message: "service not found"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An error occurred",
      error: err.message
    });
  }
});

app.get('/services', async(req,res)=>{
  try{
    const services = await servicesCollection.find({}).toArray()

    services.length>0 ? res.send({
      status: true,
      message: "services fetched successfully",
      services
    }):
    res.send({
      status:true,
      message:"No services found"
    })

  }
  catch(err){
    err && res.send({
      status: false,
      message: "An error occurred"
    })        
  }

})

//staffs
app.post('/staff', async (req, res) => {
  try {
    const staff = req.body;
      
      await staffsCollection.insertOne(staff);
      res.send({
        status: true,
        message: "Staff Created",
        staff
      });
    
  } catch (err) {
    res.send({
      status: false,
      message: "Error occurred"
    });
  }
});

app.get('/staff/:id', async(req,res) =>{

  const id = req.params.id

    try{
        const staff = await staffsCollection.findOne({
          _id: new ObjectId(id)
        })
        staff ? res.send({
          status:true,
          staff
        }) :
        res.send({
          status:false,
          message: "staff not Found"
      })

    }
    catch(err){
     res.send({
      status: false,
      message:"An Error occured",
      
     })
     console.log(err)

  }


})

app.patch('/staff/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await staffsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount > 0) {
      res.send({
        status: true,
        message: "staff Updated successfully"
      });
    } else {
      res.send({
        status: false,
        message: "No matching staff found to update"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An Error occurred",
      error: err.message
    });
  }
});
 
app.delete('/staff/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const result = await staffsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.send({
        status: true,
        message: "staff Deleted"
      });
    } else {
      res.send({
        status: false,
        message: "staff not found"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An error occurred",
      error: err.message
    });
  }
});

app.get('/staffs', async(req,res)=>{
  try{
    const staffs = await staffsCollection.find({}).toArray()

    staffs.length>0 ? res.send({
      status: true,
      message: "staff fetched successfully",
      staffs
    }):
    res.send({
      status:true,
      message:"No staff found"
    })

  }
  catch(err){
    err && res.send({
      status: false,
      message: "An error occurred"
    })        
  }

})

//booking
app.post('/booking', async (req, res) => {
  const bookingDetails = req.body;
  const { date, staff, service, slot } = req.body;

  // console.log('Booking request received:', bookingDetails);

  try {
      if (!date || !staff || !service || !slot) {
          console.log('Missing required fields:', { date, staff, service, slot });
          return res.status(400).send({
              status: false,
              message: "Missing required fields"
          });
      }

      const query = {
          date, 
          "staff._id": staff.id,
          "service._id": service.id,
          "slot._id": slot.id
      };

      const bookings = await bookingsCollection.find(query).toArray();
      console.log('Existing bookings:', bookings);

      if (bookings.length > 0) {
          return res.status(400).send({
              status: false,
              message: "Staff is already busy in this slot, please try with other staff"
          });
      }

      const result = await bookingsCollection.insertOne(bookingDetails);
      // console.log('Insert result:', result);

      if (result.insertedCount > 0) {
          return res.send({
              status: true,
              message: "Appointment Booked Successfully"
          });
      } else {
          return res.status(500).send({
              status: false,
              message: "Error, try again"
          });
      }
  } catch (err) {
      console.error("Error processing booking:", err);
      return res.status(500).send({
          status: false,
          message: "An unexpected error occurred. Please try again."
      });
  }
});




app.get('/booking/:id', async(req,res) =>{

  const id = req.params.id

    try{
        const booking = await bookingsCollection.findOne({
          _id: new ObjectId(id)
        })
        booking ? res.send({
          status:true,
          booking
        }) :
        res.send({
          status:false,
          message: "Booking not Found"
      })

    }
    catch(err){
     res.send({
      status: false,
      message:"An Error occured",
      
     })
     console.log(err)

  }


})

app.patch('/booking/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );

    if (result.matchedCount > 0) {
      res.send({
        status: true,
        message: "booking Updated successfully"
      });
    } else {
      res.send({
        status: false,
        message: "No matching booking found to update"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An Error occurred",
      error: err.message
    });
  }
});
 
app.delete('/booking/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);

    const result = await bookingsCollection.deleteOne({ _id: objectId });

    if (result.deletedCount > 0) {
      res.send({
        status: true,
        message: "booking Deleted"
      });
    } else {
      res.send({
        status: false,
        message: "booking not found"
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: "An error occurred",
      error: err.message
    });
  }
});

app.get('/bookings', async(req,res)=>{
  try{
    const bookings = await bookingsCollection.find({}).toArray()

    bookings.length>0 ? res.send({
      status: true,
      message: "bookings fetched successfully",
      bookings
    }):
    res.send({
      status:true,
      message:"No booking found"
    })

  }
  catch(err){
    err && res.send({
      status: false,
      message: "An error occurred"
    })        
  }

})

//sslcommerz init
app.get('/pay/:amount/:trx_id', (req, res) => {


  const amount = Number(req.params.amount)
  const trx_id = req.params.trx_id

  const data = {
      total_amount: amount,
      currency: 'BDT',
      tran_id: trx_id, 
      success_url: `http://localhost:5000/success/${trx_id}`,
      fail_url: `http://localhost:5000/fail/${trx_id}`,
      cancel_url: `http://localhost:5000/cancel/${trx_id}`,
      ipn_url: 'http://localhost:5000/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL
      res.redirect(GatewayPageURL)
      console.log('Redirecting to: ', GatewayPageURL)
  });
})

app.post('/success/:trx_id', async (req,res) => {
  const trx_id = req.params.trx_id

  const paymentDetails = {
    status: "success"
  }

  await bookingsCollection.updateOne({
    trx_id
  },
  {
    $set: paymentDetails
  },
  (err,result) => {
    err &&  res.send({
      status: false,
      message: err.message
    })
    result && res.redirect(`http://localhost:3000/dashboard`)
  }
)
})

app.post('/fail/:trx_id', async (req,res) => {
  const trx_id = req.params.trx_id

  const paymentDetails = {
    status: "failed"
  }

  await bookingsCollection.updateOne({
    trx_id
  },
  {
    $set: paymentDetails
  },
  (err,result) => {
    err &&  res.send({
      status: false,
      message: err.message
    })
    result && res.redirect(`http://localhost:3000/dashboard`)
  }
)
})


app.post('/cancel/:trx_id', async (req,res) => {
  const trx_id = req.params.trx_id

  const paymentDetails = {
    status: "cancel"
  }

  await bookingsCollection.updateOne({
    trx_id
  },
  {
    $set: paymentDetails
  },
  (err,result) => {
    err &&  res.send({
      status: false,
      message: err.message
    })
    result && res.redirect(`http://localhost:3000/dashboard`)
  }
)
})

    // Start the server
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
  }
}

startServer();
