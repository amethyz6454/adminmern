import React, { useEffect, useState } from "react";
import {
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListitemText,
	Typography,
	useTheme,
} from "@mui/material";
import {
	AdminPanelSettingsOutlined,
	CalendarMonthOutlined,
	ChevronLeft,
	ChevronRightOutlined,
	Groups2Outlined,
	HomeOutlined,
	PieChartOutlined,
	PointOfSaleOutlined,
	PublicOutlined,
	ReceiptLongOutlined,
	SettingsOutlined,
	ShoppingCartOutlined,
	TodayOutlined,
	TrendingUpOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
	{
		text: "Dashboard",
		icon: <HomeOutlined />,
	},
	{
		text: "Client Facing",
		icon: null,
	},
	{
		text: "Products",
		icon: <ShoppingCartOutlined />,
	},
	{
		text: "Customers",
		icon: <Groups2Outlined />,
	},
	{
		text: "Transactions",
		icon: <ReceiptLongOutlined />,
	},
	{
		text: "Geography",
		icon: <PublicOutlined />,
	},
	{
		text: "Sales",
		icon: null,
	},
	{
		text: "Overview",
		icon: <PointOfSaleOutlined />,
	},
	{
		text: "Daily",
		icon: <TodayOutlined />,
	},
	{
		text: "Monthly",
		icon: <CalendarMonthOutlined />,
	},
	{
		text: "Breakdown",
		icon: <PieChartOutlined />,
	},
	{
		text: "Management",
		icon: null,
	},
	{
		text: "Admin",
		icon: <AdminPanelSettingsOutlined />,
	},
	{
		text: "Performance",
		icon: <TrendingUpOutlined />,
	},
];

function Sidebar({ isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen }) {
	const { pathname } = useLocation();
	const [active, setActive] = useState("");
	const navigate = useNavigate();
	const theme = useTheme();

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component="nav" width={isSidebarOpen ? drawerWidth : 0} sx={{ transition: "all 200ms" }}>
			<Drawer
				open={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				variant="persistent"
				anchor="left"
				sx={{
					width: drawerWidth,
					"& .MuiDrawer-paper": {
						color: theme.palette.secondary[200],
						bgcolor: theme.palette.background.alt,
						boxSizing: "border-box",
						borderWidth: isNonMobile ? 0 : 2,
						width: drawerWidth,
					},
				}}
			>
				<Box width="100%">
					<Box m="1.5rem 2rem 2rem 3rem">
						<FlexBetween color={theme.palette.secondary.main}>
							<Box display="flex" alignItems="center" gap="0.5rem">
								<Typography variant="h4" fontWeight={600}>
									E-COM PLEX
								</Typography>
							</Box>
							{!isNonMobile && (
								<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
									<ChevronLeft />
								</IconButton>
							)}
						</FlexBetween>
					</Box>
					<List as="div">
						{navItems.map(({ text, icon }, k) => {
							if (!icon) {
								return (
									<Typography key={k} sx={{ m: "2.25rem 0 1rem 3rem" }}>
										{text}
									</Typography>
								);
							}

							const lcText = text.toLowerCase();

							return (
								<ListItem as="div" key={k} disablePadding>
									<ListItemButton
										onClick={() => {
											navigate(`/${lcText}`);
											setActive(lcText);
										}}
										sx={{
											bgcolor: active === lcText ? theme.palette.secondary[300] : "transparent",
											color:
												active === lcText
													? theme.palette.primary[600]
													: theme.palette.secondary[100],
										}}
									>
										<ListItemIcon
											sx={{
												ml: "2rem",
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[200],
											}}
										>
											{icon}
										</ListItemIcon>
										<ListItemText primary={text} />
										{active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />}
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
				</Box>
			</Drawer>
		</Box>
	);
}

export default Sidebar;
