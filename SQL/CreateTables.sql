USE [SYSMCLTD]
GO
/****** Object:  Table [dbo].[Addresses]    Script Date: 16/07/2022 20:31:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Addresses](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[city] [nvarchar](255) NOT NULL,
	[street] [nvarchar](255) NOT NULL,
	[customerId] [int] NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[created] [datetime] NOT NULL,
 CONSTRAINT [PK_Addresses] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 16/07/2022 20:31:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fullName] [nvarchar](255) NOT NULL,
	[officeNumber] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[customerId] [int] NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[created] [datetime] NOT NULL,
 CONSTRAINT [PK_Contacts] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 16/07/2022 20:31:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customerId] [int] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[customerNumber] [int] NOT NULL,
	[isDeleted] [bit] NOT NULL,
	[created] [datetime] NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Addresses] ADD  CONSTRAINT [DF_Addresses_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[Addresses] ADD  CONSTRAINT [DF_Addresses_created]  DEFAULT (getdate()) FOR [created]
GO
ALTER TABLE [dbo].[Contacts] ADD  CONSTRAINT [DF_Contacts_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[Contacts] ADD  CONSTRAINT [DF_Contacts_created]  DEFAULT (getdate()) FOR [created]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_isDeleted]  DEFAULT ((0)) FOR [isDeleted]
GO
ALTER TABLE [dbo].[Customers] ADD  CONSTRAINT [DF_Customers_created]  DEFAULT (getdate()) FOR [created]
GO
