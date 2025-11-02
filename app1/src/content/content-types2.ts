export interface ContentRoot {
  'Login.Labels.Email': string;
  'Login.Labels.Password': string;
  'Login.Labels.EmailPlaceholder': string;
  'Login.Labels.PasswordPlaceholder': string;
  'Dashboard.TrendingVisitors.Title': string;
  'Dashboard.TrendingVisitors.ThisPeriod': string;
  'Dashboard.TrendingVisitors.PreviousPeriod': string;
  'Dashboard.Greeting': string;
  'Dashboard.Infoboxes.TotalVisitors': string;
  'Dashboard.Infoboxes.BounceRate': string;
  'Dashboard.Infoboxes.ConversionRate': string;
  'Dashboard.Infoboxes.NewSignups': string;
  'Dashboard.RoleDisplay': DashboardRoleDisplay;
  'Sidebar.Analytics': string;
  'Sidebar.Dashboard': string;
  'Sidebar.Reports': string;
  'Sidebar.Integrations': string;
  'Sidebar.Settings': string;
}

interface DashboardRoleDisplay {
  contentstorage_type: string;
  data: Data;
}

interface Data {
  user: string;
  admin: string;
}