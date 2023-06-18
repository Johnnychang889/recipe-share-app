/* eslint-disable no-param-reassign */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const USER_DATA_FILE = path.join(__dirname, 'server-user-data.json');
const DISH_DATA_FILE = path.join(__dirname, 'server-dish-data.json');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Make things more noticeable in the UI by introducing a fake delay
// to logins
const FAKE_DELAY = 500; // ms
app.post('/login', (req, res) => {
  fs.readFile(USER_DATA_FILE, (err, data) => {
    const users = JSON.parse(data);
    const user = users.find(user => user.account === req.body.id && user.password === req.body.password);
    
    var result;
    if(user) {
      result = {
        success: true,
        token: user.token,
        user: user
      }
    } else {
      result = {
        success: false
      }
    }
    setTimeout(() => (
      res.json(result)
    ), FAKE_DELAY);
  });

});

app.post('/login/check', (req, res) => {
  fs.readFile(USER_DATA_FILE, (err, data) => {
    const users = JSON.parse(data);
    const user = users.find(user => user.token === req.body.token);
    
    var result;
    if(user) {
      result = {
        success: true,
        token: user.token,
        user: user
      }
    } else {
      result = {
        success: false
      }
    }
    setTimeout(() => (
      res.json(result)
    ), FAKE_DELAY);
  });

});

/* dishes start */
app.get('/dishes', (req, res) => {
  fs.readFile(DISH_DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});
app.post('/dishes', (req, res) => {
  fs.readFile(DISH_DATA_FILE, (err, data) => {
    const dishes = JSON.parse(data);
    const newDish = { 
      id: (dishes.length + 1).toString(), 
      like: 0,
      uploader: {
        name: req.body.uploader.name,
        avatar: req.body.uploader.avatar,
      },
      dish: req.body.dish, 
      servings: req.body.servings,
      timespent: req.body.timespent,
      image: req.body.image, 
      description: req.body.description,
      ingredients: req.body.ingredients,
      step: req.body.step,
      notes: req.body.notes,
    };
    let dishExists = false;
    dishes.map((dish) => {
      if (dish.id === newDish.id) {
        dishExists = true;
      }
    });
    if (!dishExists) dishes.push(newDish);
    fs.writeFile(DISH_DATA_FILE, JSON.stringify(dishes, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(dishes);
    });
  });
});
app.post('/dishes/like', (req, res) => {
  fs.readFile(DISH_DATA_FILE, (err, data) => {
    const dishes = JSON.parse(data);
    const likeDish = req.body;
    let dishExists = false;
    dishes.map((dish) => {
      if (dish.id === likeDish.id) {
        dishExists = true;
      }
    });
    if (dishExists) {
      dishes.forEach(dish => {
        if (dish.id === likeDish.id) {
          dish.like++;
        }
      });
    }
    fs.writeFile(DISH_DATA_FILE, JSON.stringify(dishes, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(dishes);
    });
  });
});
app.post('/dishes/dislike', (req, res) => {
  fs.readFile(DISH_DATA_FILE, (err, data) => {
    const dishes = JSON.parse(data);
    const likeDish = req.body;
    let dishExists = false;
    dishes.map((dish) => {
      if (dish.id === likeDish.id) {
        dishExists = true;
      }
    });
    if (dishExists) {
      dishes.forEach(dish => {
        if (dish.id === likeDish.id) {
          dish.like--;
        }
      });
    }
    fs.writeFile(DISH_DATA_FILE, JSON.stringify(dishes, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(dishes);
    });
  });
});
app.post('/dishes/delete', (req, res) => {
  fs.readFile(DISH_DATA_FILE, (err, data) => {
    let dishes = JSON.parse(data);
    dishes.map((dish) => {
      if (dish.id === req.body.id) {
        const dishIndexToRemove = dishes.findIndex(dish => dish.id === req.body.id);
        dishes.splice(dishIndexToRemove, 1);
      }
    });
    fs.writeFile(DISH_DATA_FILE, JSON.stringify(dishes, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(dishes);
    });
  });
});

/* dishes end*/

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
