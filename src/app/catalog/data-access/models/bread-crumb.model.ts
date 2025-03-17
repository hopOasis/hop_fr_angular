export interface BreadCrumbLink {
  title: string;
  linkPath: string;
}
export interface BreadCrumb {
  linksList: BreadCrumbLink[];
  currentPathName: string;
}
