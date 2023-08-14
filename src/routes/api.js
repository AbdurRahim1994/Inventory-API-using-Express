const express = require('express')
const router = express.Router()
const UserController = require('../controllers/Users/UserController')
const BrandController = require('../controllers/Brand/BrandController')
const CategoryController = require('../controllers/Categories/CategoryController')
const SupplierController = require('../controllers/Suppliers/SupplierController')
const CustomerController = require('../controllers/Customers/CustomerController')
const ExpenseTypeController = require('../controllers/Expenses/ExpenseTypeController')
const ExpenseController = require('../controllers/Expenses/ExpenseController')
const ProductController = require('../controllers/Products/ProductController')
const PurchaseController = require('../controllers/Purchases/PurchaseController')
const SalesController = require('../controllers/Sales/SalesController')
const ReturnController = require('../controllers/Returns/ReturnsController')
const ReportController = require('../controllers/Report/ReportController')
const SummaryController = require('../controllers/Summary/SummaryController')
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware')

// User Module
router.post('/Registration', UserController.Registration);
router.post('/Login', UserController.Login)
router.get('/ProfileDetails', AuthVerifyMiddleware, UserController.ProfileDetails)
router.post('/ProfileUpdate', AuthVerifyMiddleware, UserController.ProfileUpdate)
router.post('/EmailVerify/:email', UserController.RecoverVerifyEmail);
router.post('/OTPVerify/:email', UserController.RecoverVerifyOTP)
router.post('/PasswordReset', UserController.RecoverPassReset)

// Brand Module
router.post('/CreateBrand', AuthVerifyMiddleware, BrandController.CreateBrand);
router.post('/UpdateBrand/:id', AuthVerifyMiddleware, BrandController.UpdateBrand);
router.get('/BrandDropDown', AuthVerifyMiddleware, BrandController.BrandDropDown);
router.get('/BrandList/:pageNo/:perPage/:search', AuthVerifyMiddleware, BrandController.BrandList)
router.post('/DeleteBrand/:id', AuthVerifyMiddleware, BrandController.DeleteBrand);
router.get('/BrandDetailById/:id', AuthVerifyMiddleware, BrandController.BrandDetailById);

// Category Module
router.post('/CreateCategory', AuthVerifyMiddleware, CategoryController.CreateCategory);
router.post('/UpdateCategory/:id', AuthVerifyMiddleware, CategoryController.UpdateCategory);
router.get('/CategoryDropDown', AuthVerifyMiddleware, CategoryController.CategoryDropDown);
router.post('/DeleteCategory/:id', AuthVerifyMiddleware, CategoryController.DeleteCategory);
router.get('/CategoryDetailById/:id', AuthVerifyMiddleware, CategoryController.CategoryDetailById);
router.get('/CategoryList/:pageNo/:perPage/:search', AuthVerifyMiddleware, CategoryController.CategoryList)

// Supplier Module
router.post('/CreateSupplier', AuthVerifyMiddleware, SupplierController.CreateSupplier);
router.post('/UpdateSupplier/:id', AuthVerifyMiddleware, SupplierController.UpdateSupplier);
router.get('/SupplierDropDown', AuthVerifyMiddleware, SupplierController.SupplierDropDown);
router.post('/DeleteSupplier/:id', AuthVerifyMiddleware, SupplierController.DeleteSupplier);
router.get('/SupplierDetailById/:id', AuthVerifyMiddleware, SupplierController.SupplierDetailById);
router.get('/SupplierList/:pageNo/:perPage/:search', AuthVerifyMiddleware, SupplierController.SupplierList)

// Customer Module
router.post('/CreateCustomer', AuthVerifyMiddleware, CustomerController.CreateCustomer);
router.post('/UpdateCustomer/:id', AuthVerifyMiddleware, CustomerController.UpdateCustomer);
router.get('/CustomerDropDown', AuthVerifyMiddleware, CustomerController.CustomerDropDown);
router.post('/DeleteCustomer/:id', AuthVerifyMiddleware, CustomerController.DeleteCustomer);
router.get('/CustomerDetailById/:id', AuthVerifyMiddleware, CustomerController.CustomerDetailById);
router.get('/CustomerList/:pageNo/:perPage/:search', AuthVerifyMiddleware, CustomerController.CustomerList)

// Expense Type Module
router.post('/CreateExpenseType', AuthVerifyMiddleware, ExpenseTypeController.CreateExpenseType);
router.post('/UpdateExpenseType/:id', AuthVerifyMiddleware, ExpenseTypeController.UpdateExpenseType)
router.get('/ExpenseTypeDropDown', AuthVerifyMiddleware, ExpenseTypeController.ExpenseTypeDropDown);
router.get('/ExpenseTypeList/:pageNo/:perPage/:search', AuthVerifyMiddleware, ExpenseTypeController.ExpenseTypeList)
router.post('/DeleteExpenseType/:id', AuthVerifyMiddleware, ExpenseTypeController.DeleteExpenseType);
router.get('/ExpenseTypeDetailById/:id', AuthVerifyMiddleware, ExpenseTypeController.ExpenseTypeDetailById)

// Expense Module
router.post('/CreateExpense', AuthVerifyMiddleware, ExpenseController.CreateExpense);
router.post('/UpdateExpense/:id', AuthVerifyMiddleware, ExpenseController.UpdateExpense);
router.get('/ExpenseList/:pageNo/:perPage/:search', AuthVerifyMiddleware, ExpenseController.ExpenseList)
router.post('/DeleteExpense/:id', AuthVerifyMiddleware, ExpenseController.DeleteExpense);
router.get('/ExpenseDetailById/:id', AuthVerifyMiddleware, ExpenseController.ExpenseDetailById);

// Product Module
router.post('/CreateProduct', AuthVerifyMiddleware, ProductController.CreateProduct);
router.post('/UpdateProduct/:id', AuthVerifyMiddleware, ProductController.UpdateProduct);
router.post('/DeleteProduct/:id', AuthVerifyMiddleware, ProductController.DeleteProduct);
router.get('/ProductList/:pageNo/:perPage/:search', AuthVerifyMiddleware, ProductController.ProductList)
router.get('/ProductDetailById/:id', AuthVerifyMiddleware, ProductController.ProductDetailById);
router.get('/ProductDropDown', AuthVerifyMiddleware, ProductController.ProductDropDown)

// Purchase Module
router.post('/CreatePurchase', AuthVerifyMiddleware, PurchaseController.CreatePurchase);
router.get('/PurchaseList/:pageNo/:perPage/:search', AuthVerifyMiddleware, PurchaseController.PurchaseList)
router.post('/DeletePurchase/:id', AuthVerifyMiddleware, PurchaseController.DeletePurchase);

// Sales Module
router.post('/CreateSales', AuthVerifyMiddleware, SalesController.CreateSales);
router.get('/SalesList/:pageNo/:perPage/:search', AuthVerifyMiddleware, SalesController.SalesList)
router.post('/DeleteSales/:id', AuthVerifyMiddleware, SalesController.DeleteSales);

// Returns Module
router.post('/CreateReturn', AuthVerifyMiddleware, ReturnController.CreateReturn);
router.get('/ReturnList/:pageNo/:perPage/:search', AuthVerifyMiddleware, ReturnController.ReturnList)
router.post('/DeleteReturn/:id', AuthVerifyMiddleware, ReturnController.DeleteReturn);

// Report Module
router.post('/ExpenseByDate', AuthVerifyMiddleware, ReportController.ExpenseByDate);
router.post('/PurchaseByDate', AuthVerifyMiddleware, ReportController.PurchaseByDate);
router.post('/SalesByDate', AuthVerifyMiddleware, ReportController.SalesByDate);
router.post('/ReturnByDate', AuthVerifyMiddleware, ReportController.ReturnByDate);

// Summary Module
router.get('/ExpenseSummary', AuthVerifyMiddleware, SummaryController.ExpenseSummary);
router.get('/PurchaseSummary', AuthVerifyMiddleware, SummaryController.PurchaseSummary);
router.get('/SalesSummary', AuthVerifyMiddleware, SummaryController.SalesSummary);
router.get('/ReturnSummary', AuthVerifyMiddleware, SummaryController.ReturnSummary);

module.exports = router