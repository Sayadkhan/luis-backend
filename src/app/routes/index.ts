import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UiRoutes } from "../modules/ui/ui.route";
import { UserROutes } from "../modules/users/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { SpotRoutes } from "../modules/spot/spot.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { ClubRoutes } from "../modules/club/club.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { BlogRoutes } from "../modules/blog/blog.route";
import { InquiryRoutes } from "../modules/inquiry/inquiry.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserROutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/ui",
    route: UiRoutes,
  },
  {
    path: "/spot",
    route: SpotRoutes,
  },
  {
    path: "/club",
    route: ClubRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/blog",
    route: BlogRoutes,
  },
  {
    path: "/inquiry",
    route: InquiryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
