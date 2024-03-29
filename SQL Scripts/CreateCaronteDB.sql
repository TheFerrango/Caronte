USE [master]
GO
/****** Object:  Database [Caronte]    Script Date: 15/07/2015 16:14:03 ******/
CREATE DATABASE [Caronte]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GestioneTrasporti', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLSERVER2014\MSSQL\DATA\GestioneTrasporti.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'GestioneTrasporti_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLSERVER2014\MSSQL\DATA\GestioneTrasporti_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Caronte] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Caronte].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Caronte] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Caronte] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Caronte] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Caronte] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Caronte] SET ARITHABORT OFF 
GO
ALTER DATABASE [Caronte] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Caronte] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Caronte] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Caronte] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Caronte] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Caronte] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Caronte] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Caronte] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Caronte] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Caronte] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Caronte] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Caronte] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Caronte] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Caronte] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Caronte] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Caronte] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Caronte] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Caronte] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Caronte] SET  MULTI_USER 
GO
ALTER DATABASE [Caronte] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Caronte] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Caronte] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Caronte] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Caronte] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Caronte', N'ON'
GO
USE [Caronte]
GO
/****** Object:  Table [dbo].[Anagrafica]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Anagrafica](
	[IDAnagrafica] [int] IDENTITY(1,1) NOT NULL,
	[CodiceFiscale] [nvarchar](16) NOT NULL,
	[Nome] [nvarchar](50) NOT NULL,
	[Cognome] [nvarchar](50) NOT NULL,
	[DataNascita] [datetimeoffset](7) NOT NULL,
	[Indirizzo] [nvarchar](255) NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
	[Sesso] [bit] NOT NULL CONSTRAINT [DF_Anagrafica_Sesso]  DEFAULT ((1)),
	[Telefono] [nvarchar](20) NULL,
	[Cellulare] [nvarchar](20) NULL,
	[Email] [nvarchar](20) NULL,
 CONSTRAINT [PK_Anagrafica] PRIMARY KEY CLUSTERED 
(
	[IDAnagrafica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Dipendente]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Dipendente](
	[IDDipendente] [int] IDENTITY(1,1) NOT NULL,
	[FKIDAnagrafica] [int] NULL,
	[FKIDRuolo] [int] NULL,
	[Password] [varchar](255) NOT NULL,
	[DipendenteDal] [datetimeoffset](7) NOT NULL,
	[DipendenteAl] [datetimeoffset](7) NULL,
	[Attivo] [bit] NOT NULL,
 CONSTRAINT [PK_Dipendente] PRIMARY KEY CLUSTERED 
(
	[IDDipendente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Posizione]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Posizione](
	[IDPosizione] [int] IDENTITY(1,1) NOT NULL,
	[FKIDViaggio] [int] NULL,
	[Data] [datetimeoffset](7) NOT NULL,
	[Latitudine] [float] NOT NULL,
	[Longitudine] [float] NOT NULL,
 CONSTRAINT [PK_Posizione] PRIMARY KEY CLUSTERED 
(
	[IDPosizione] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Ruolo]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ruolo](
	[IDRuolo] [int] IDENTITY(1,1) NOT NULL,
	[Descrizione] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Ruolo] PRIMARY KEY CLUSTERED 
(
	[IDRuolo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Spostamento]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Spostamento](
	[IDSpostamento] [int] IDENTITY(1,1) NOT NULL,
	[FKIDAnagrafica] [int] NULL,
	[FKIDViaggio] [int] NULL,
	[FKIDStato] [int] NULL,
	[DescrizioneViaggio] [nvarchar](255) NULL,
	[DataSalitaPrevista] [datetimeoffset](7) NOT NULL,
	[DataDiscesaPrevista] [datetimeoffset](7) NOT NULL,
	[DataSalitaEffettiva] [datetimeoffset](7) NULL,
	[DataDiscesaEffettiva] [datetimeoffset](7) NULL,
	[LatitudineSalitaPrevista] [float] NOT NULL,
	[LongitudineSalitaPrevista] [float] NOT NULL,
	[LatitudineDiscesaPrevista] [float] NOT NULL,
	[LongitudineDiscesaPrevista] [float] NOT NULL,
	[LatitudineSalitaEffettiva] [float] NULL,
	[LongitudineSalitaEffettiva] [float] NULL,
	[LatitudineDiscesaEffettiva] [float] NULL,
	[LongitudineDiscesaEffettiva] [float] NULL,
	[IndirizzoSalita] [nvarchar](50) NOT NULL,
	[IndirizzoDiscesa] [nvarchar](50) NOT NULL,
 CONSTRAINT [IDSpostamento] PRIMARY KEY CLUSTERED 
(
	[IDSpostamento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Stato]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stato](
	[IDStato] [int] IDENTITY(1,1) NOT NULL,
	[Descrizione] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Stato] PRIMARY KEY CLUSTERED 
(
	[IDStato] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Veicolo]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Veicolo](
	[IDVeicolo] [int] IDENTITY(1,1) NOT NULL,
	[Targa] [nvarchar](10) NOT NULL,
	[Modello] [nvarchar](50) NOT NULL,
	[AnnoProduzione] [int] NOT NULL,
	[DataAcquisto] [datetimeoffset](7) NOT NULL,
	[DataVendita] [datetimeoffset](7) NULL,
	[Cilindrata] [int] NOT NULL,
 CONSTRAINT [PK_Veicolo] PRIMARY KEY CLUSTERED 
(
	[IDVeicolo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Viaggio]    Script Date: 15/07/2015 16:14:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Viaggio](
	[IDViaggio] [int] IDENTITY(1,1) NOT NULL,
	[FKIDDipendente] [int] NULL,
	[FKIDStato] [int] NULL,
	[FKIDVeicolo] [int] NULL,
	[DescrizioneViaggio] [nvarchar](255) NULL,
	[DataInizioPrevista] [datetimeoffset](7) NOT NULL,
	[DataFinePrevista] [datetimeoffset](7) NOT NULL,
	[DataInizioEffettiva] [datetimeoffset](7) NULL,
	[DataFineEffettiva] [datetimeoffset](7) NULL,
	[LatitudinePartenzaPrevista] [float] NOT NULL,
	[LongitudinePartenzaPrevista] [float] NOT NULL,
	[LatitudineArrivoPrevista] [float] NOT NULL,
	[LongitudineArrivoPrevista] [float] NOT NULL,
	[LatitudinePartenzaEffettiva] [float] NULL,
	[LongitudinePartenzaEffettiva] [float] NULL,
	[LatitudineArrivoEffettiva] [float] NULL,
	[LongitudineArrivoEffettiva] [float] NULL,
	[IndirizzoPartenza] [nvarchar](50) NOT NULL,
	[IndirizzoArrivo] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Viaggio] PRIMARY KEY CLUSTERED 
(
	[IDViaggio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Dipendente]  WITH CHECK ADD  CONSTRAINT [FK_Dipendente_Anagrafica] FOREIGN KEY([FKIDAnagrafica])
REFERENCES [dbo].[Anagrafica] ([IDAnagrafica])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Dipendente] CHECK CONSTRAINT [FK_Dipendente_Anagrafica]
GO
ALTER TABLE [dbo].[Dipendente]  WITH CHECK ADD  CONSTRAINT [FK_Dipendente_Ruolo] FOREIGN KEY([FKIDRuolo])
REFERENCES [dbo].[Ruolo] ([IDRuolo])
ON UPDATE CASCADE
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Dipendente] CHECK CONSTRAINT [FK_Dipendente_Ruolo]
GO
ALTER TABLE [dbo].[Posizione]  WITH CHECK ADD  CONSTRAINT [FK_Posizione_Viaggio] FOREIGN KEY([FKIDViaggio])
REFERENCES [dbo].[Viaggio] ([IDViaggio])
GO
ALTER TABLE [dbo].[Posizione] CHECK CONSTRAINT [FK_Posizione_Viaggio]
GO
ALTER TABLE [dbo].[Spostamento]  WITH CHECK ADD  CONSTRAINT [FK_Spostamento_Anagrafica] FOREIGN KEY([FKIDAnagrafica])
REFERENCES [dbo].[Anagrafica] ([IDAnagrafica])
GO
ALTER TABLE [dbo].[Spostamento] CHECK CONSTRAINT [FK_Spostamento_Anagrafica]
GO
ALTER TABLE [dbo].[Spostamento]  WITH CHECK ADD  CONSTRAINT [FK_Spostamento_Stato] FOREIGN KEY([FKIDStato])
REFERENCES [dbo].[Stato] ([IDStato])
GO
ALTER TABLE [dbo].[Spostamento] CHECK CONSTRAINT [FK_Spostamento_Stato]
GO
ALTER TABLE [dbo].[Spostamento]  WITH CHECK ADD  CONSTRAINT [FK_Spostamento_Viaggio] FOREIGN KEY([FKIDViaggio])
REFERENCES [dbo].[Viaggio] ([IDViaggio])
GO
ALTER TABLE [dbo].[Spostamento] CHECK CONSTRAINT [FK_Spostamento_Viaggio]
GO
ALTER TABLE [dbo].[Viaggio]  WITH CHECK ADD  CONSTRAINT [FK_Viaggio_Dipendente] FOREIGN KEY([FKIDDipendente])
REFERENCES [dbo].[Dipendente] ([IDDipendente])
GO
ALTER TABLE [dbo].[Viaggio] CHECK CONSTRAINT [FK_Viaggio_Dipendente]
GO
ALTER TABLE [dbo].[Viaggio]  WITH CHECK ADD  CONSTRAINT [FK_Viaggio_Stato] FOREIGN KEY([FKIDStato])
REFERENCES [dbo].[Stato] ([IDStato])
GO
ALTER TABLE [dbo].[Viaggio] CHECK CONSTRAINT [FK_Viaggio_Stato]
GO
ALTER TABLE [dbo].[Viaggio]  WITH CHECK ADD  CONSTRAINT [FK_Viaggio_Veicolo] FOREIGN KEY([FKIDVeicolo])
REFERENCES [dbo].[Veicolo] ([IDVeicolo])
GO
ALTER TABLE [dbo].[Viaggio] CHECK CONSTRAINT [FK_Viaggio_Veicolo]
GO
USE [master]
GO
ALTER DATABASE [Caronte] SET  READ_WRITE 
GO
