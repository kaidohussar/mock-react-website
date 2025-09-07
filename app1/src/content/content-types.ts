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
  'Sidebar.Test': SidebarTest;
}

interface SidebarTest {
  contentstorage_type: string;
  data: Data2;
}

interface Data2 {
  default: string;
  variation2: string;
}

interface DashboardRoleDisplay {
  contentstorage_type: string;
  data: Data;
}

interface Data {
  user: string;
  admin: string;
}