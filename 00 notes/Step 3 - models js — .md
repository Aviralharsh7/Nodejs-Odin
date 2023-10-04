# Step 3 - models.js —

Status: realWorld-backend-medium
file link: https://github.com/winterrrrrff/realWorld-server/tree/main/models

# 1. Articles

```jsx
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify');
const User = require('./User');
```

- mongoose is nodejs library which helps with data modeling and defining schema and perform operations with mongodb databases
- unique-validator is a plugin for mongoose that adds validation for unique fields in mongodb documents.
    - this plugin ensures that in a collection, no two such documents exists which have same value for same field (email, username)
- slugify is npm module which creates slugs from strings, making them more readible and seo friendly.
    - A slug is a URL-friendly version of a string, typically generated from a title or a name.
- we import user module containing schema of for user database.

```jsx
const articleSchema = new mongoose.Schema({
  slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
  },
  title: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true
  },
  body: {
      type: String,
      required: true
  },
  tagList: [{
      type: String
  }],
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  favouritesCount: {
      type: Number,
      default: 0
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
  }]
}, {
  timestamps: true
});
```

- essentially we are defining a mongoose schema here for “an article” in mongodb database.
    - A schema in Mongoose defines the structure of documents (data records) that will be stored in a MongoDB collection. It specifies the fields or attributes that an article document can have, along with their data types and validation rules.
- articleSchema is variable the represents this schema.
    - remember this template as reference for what variouus rules and other properties can be defined inside a schema for a document in mongoDB (required, unique, ref, type, index)
- When you create an index on a field, MongoDB creates a sorted data structure for that field, which allows for faster searching and sorting based on that field.
- The **`ref`** option is used in Mongoose schemas when defining a field that is a reference to another Mongoose model. It establishes a relationship between two models by specifying the target model to which the field refers. This is typically used for creating relationships between documents in different collections.
    - **`ref: 'User'`** specifies that the **`author`** field is a reference to the 'User' model.
- **`mongoose.Schema.Types.ObjectId`**: This is a data type provided by Mongoose to represent MongoDB ObjectId values. ObjectId is a special 12-byte identifier that MongoDB assigns to each document when it's inserted into a collection. ObjectId values are unique within a collection and are used to identify documents.

```jsx
articleSchema.methods.updateFavoriteCount = async function () {
    const favoriteCount = await User.count({
        favouriteArticles: {$in: [this._id]}
    });

    this.favouritesCount = favoriteCount;

    return this.save();
}
```

-
