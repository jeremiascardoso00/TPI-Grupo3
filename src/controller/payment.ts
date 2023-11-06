import {  Bill } from '../models/bill'; // Import your models
import {  Payment } from '../models/payment'; // Import your models

import express, { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { ObjectId } from 'mongodb';
import { User } from '../models/user';




const createPaymentAndBill = async (req: Request, res: Response) => {
    try {
      // Get the user ID from the request parameters
      const userId = new ObjectId(req.params.uid);
  
      // Fetch the user from the database
      const user = await User.findOne(userId);
      if (!user) {
        res.status(404).send('No user found with that ID');
        return;
      }
  
      // Create a new Bill with the user data and the amount from the request body
      const bill = new Bill({
        customer: user._id,
        customerName: user.name, // Replace 'name' with the actual user name field
        total: req.body.amount
      });
      await Bill.create(bill);
  
      // Create a new Payment with the created Bill
      const payment = new Payment({
        ...req.body,
        bill: bill._id
      });
      await Payment.create(payment);
  
      res.json({ bill, payment });
      return;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  };

const getBillPdf = async (req: Request, res: Response) => {
    try {
      const paymentId = new ObjectId(req.params.pid);
      const payment = await Payment.findById(paymentId)
      .populate('bill');
  
      if (!payment || !payment.bill) {
        res.status(404).send('No payment found with that ID');
        return;  // Add this return statement
      }


        let doc = new PDFDocument;

        // Set some meta data
        doc.info['Title'] = 'Factura';
        doc.info['Author'] = 'Empresa S.A.';

        // Write a title
        doc.fontSize(25)
        .text('FACTURA', {
            align: 'center',
            underline: true
        });

        // Write a subtitle
        doc.moveDown()
        .fontSize(18)
        .text(`Nro. Comp.: ${payment.billNumber}`, {
            align: 'center'
        });

        // Write some content
        doc.moveDown()
        .fontSize(14)
        .text(`Fecha de Emisión: ${payment.bill.date}`, {
            align: 'left'
        })
        .text(`Cuit: ${payment.bill.customer.cuit}`, {
            align: 'left'
        })
        .text(`Razón Social: ${payment.bill.customer.name}`, {
            align: 'left'
        })
        .text(`Dir.: ${payment.bill.customer.address}`, {
            align: 'left'
        })
        .text(`Tel.: ${payment.bill.customer.phone}`, {
            align: 'left'
        });

        // Add a table with itemized charges
        // ...

        // Write the total
        doc.text(`Total: ${payment.amount}`, {
            align: 'right'
        });

        doc.pipe(res);

        doc.end();
    
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  };

export default {
    createPaymentAndBill,
  getBillPdf
};