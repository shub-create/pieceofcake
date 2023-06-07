const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const uploadFeature = require('@admin-bro/upload')

const mongoose = require('mongoose');

const Product = require('../models/product');
const Banner = require('../models/banner');

AdminBro.registerAdapter(AdminBroMongoose);


const adminBro = new AdminBro({
  databases: [mongoose],
  resources: [{
    resource: Product,
    options: {
        properties: {
            cimage: {
                isVisible: false
            },
            image_arr: {
                isVisible: false
            }
        }
    },

    features: [
        uploadFeature({
            provider: { aws: {
                bucket: process.env.AWS_BUCKET,
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
                expires: 0,
                shouldSetContentType: true
            }},
            properties: {
                file: 'uploadone',
                key: 'cimage.path',
                mimeType: 'cimage.type'
            }
          }),
          uploadFeature({
            provider: { aws: {
                bucket: process.env.AWS_BUCKET,
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
                expires: 0,
                shouldSetContentType: true
            }},
            properties: {
                key: 'image_arr.path',
                mimeType: 'image_arr.type',
                file: 'uploadMulti',
                filePath: 'uploadPath',
                filesToDelete: 'delete'
            },
            multiple: true,
          }),
        
  ]
    
  },
  {
    resource: Banner,
    options: {
        properties: {
            banner_img: {
                isVisible: false
            }
        }
    },
    features: [
        uploadFeature({
            provider: { aws: {
                bucket: process.env.AWS_BUCKET,
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
                expires: 0,
                shouldSetContentType: true
            }},
            properties: {
                file: 'uploadonebanner',
                key: 'banner_img.path',
                mimeType: 'banner_img.type'
            }
          }),    
  ]
  }
],
  rootPath: '/admin',
})

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME,
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
    authenticate: async (email,password) => {
        if (email===ADMIN.email && password=== ADMIN.password){
            return ADMIN
        }

        return null;
    }
});

module.exports = router;