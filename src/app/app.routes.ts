import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { userLoggedGuardGuard } from './core/guards/user-logged-guard-guard';

export const routes: Routes = [
    // Default Route
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    // Auth Route (Layouts can also be lazy loaded, or kept static if lightweight)
    { 
        path: '', 
        component: AuthLayout,canActivate:[userLoggedGuardGuard] ,
        children: [
            { 
                path: 'login', 
                loadComponent: () => import('./pages/login/login').then(m => m.Login), 
                title: 'Login' 
            },
            { 
                path: 'register', 
                loadComponent: () => import('./pages/register/register').then(m => m.Register), 
                title: 'Register' 
            },
            { 
                path: 'forget-password', 
                loadComponent: () => import('./pages/forget-password/forget-password').then(m =>m.ForgetPassword), 
                title: 'forget-password' 
            }
        ] 
    },

    // Main Layout (Blank)
    { 
        path: '', 
        component: BlankLayout,canActivate:[authGuardGuard] ,
        children: [
            { 
                path: 'home', 
                loadComponent: () => import('./pages/home/home').then(m => m.Home), 
                title: 'Home' 
            },
            { 
                path: 'products', 
                loadComponent: () => import('./pages/allProducts/allProducts').then(m => m.Allproducts), 
                title: 'Products' 
            },
            { 
                path: 'checkout', 
                loadComponent: () => import('./pages/check-out/check-out').then(m => m.CheckOut), 
                title: 'CheckOut' 
            },
            { 
                path: 'brands', 
                loadComponent: () => import('./pages/brands/brands').then(m => m.Brands), 
                title: 'Brands' 
            },
           { 
  path: 'cart', 
  loadComponent: () => import('./pages/cart/cart').then(m =>m.Cart) 
},
            { 
                path: 'categories', 
                loadComponent: () => import('./pages/category/category').then(m => m.Category), 
                title: 'Categories' 
            },
            { 
                path: 'details/:productId', 
                loadComponent: () => import('./pages/product-info/product-info').then(m =>m.ProductInfo), 
                title: 'details' 
            },
            { 
                path: 'allorders', 
                loadComponent: () => import('./pages/all-orders/all-orders').then(m =>m.AllOrders), 
                title: 'all Orderes' 
            },
            { 
                path: 'checkOut/:id', 
                loadComponent: () => import('./pages/check-out/check-out').then(m =>m.CheckOut), 
                title: 'checkOut' 
            },
            { 
                path: '**', 
                loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound), 
                title: 'Page not Found'      
            } 
        ] 
    }
];