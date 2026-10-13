export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">TVs</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Refrigerators</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Washing Machines</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Air Conditioners</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Warranty</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Service & Repair</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Register Product</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Press</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Management</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="/admin" className="text-sm font-bold text-primary hover:underline">Admin Dashboard</a></li>
              <li><a href="/admin/orders" className="text-sm text-text-muted hover:text-primary">Order Queue</a></li>
              <li><a href="/admin/products" className="text-sm text-text-muted hover:text-primary">Product Catalog</a></li>
              <li><a href="/admin/inventory" className="text-sm text-text-muted hover:text-primary">Stock & Alerts</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-text-faint">
            &copy; 2026 ORBIT Electronics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
