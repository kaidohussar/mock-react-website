export interface ContentRoot {
  'Login.Labels.Password': string;
  'Login.Labels.Email': string;
  'Login.Labels.dsdfsdf': string;
  'Login.Labels.PasswordPlaceholder': string;
  'Login.Labels.newtext': string;
  'Login.Labels.sdflksdf': string;
  'Login.Labels.asdasdasd': string;
  'Login.Labels.sdfsdfsf': string;
  'Login.Labels.Test': string;
  'Login.Labels.NewLabel': string;
  'Login.Labels.LoginButtonText': string;
  'Login.Labels.ForgotPassword': string;
  'Login.Item': string;
  'Dashboard.Greeting': string;
  'Dashboard.RoleDisplay': DashboardRoleDisplay;
  'Dashboard.Infoboxes.TotalVisitors': string;
  'Dashboard.Infoboxes.BounceRate': string;
  'Dashboard.Infoboxes.ConversionRate': string;
  'Dashboard.Infoboxes.NewSignups': string;
  'Dashboard.TrendingVisitors.Title': string;
  'Dashboard.TrendingVisitors.ThisPeriod': string;
  'Dashboard.TrendingVisitors.PreviousPeriod': string;
  'Sidebar.Dashboard': string;
  'Sidebar.Reports': string;
  'Sidebar.Integrations': string;
  'Sidebar.Analytics': string;
  'Sidebar.Lebo': string;
  'Onboarding.Tutorials': OnboardingTutorials;
  'Onboarding.NewUserTutorial2': string;
}

interface OnboardingTutorials {
}

interface DashboardRoleDisplay {
  contentstorage_type: string;
  data: Data;
}

interface Data {
  user: string;
  admin: string;
}