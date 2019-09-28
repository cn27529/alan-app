using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CoreMVC01.Models
{
    public partial class CORETONMDFContext : DbContext
    {
        public CORETONMDFContext()
        {
        }

        public CORETONMDFContext(DbContextOptions<CORETONMDFContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ClassForCompany> ClassForCompany { get; set; }
        public virtual DbSet<ClassForProduct> ClassForProduct { get; set; }
        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Products> Products { get; set; }
        public virtual DbSet<Purchase> Purchase { get; set; }
        public virtual DbSet<Sell> Sell { get; set; }
        public virtual DbSet<Suppliers> Suppliers { get; set; }

        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;AttachDbFilename=C:\\USERS\\USER\\SOURCE\\REPOS\\2019CORE01\\CoreMVC01\\APP_DATA\\CORETON.MDF;Trusted_Connection=True;");
            }
        }
        */

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<ClassForCompany>(entity =>
            {
                entity.HasKey(e => e.ClassId)
                    .HasName("PK__ClassFor__CB1927C06B639BC6");

                entity.Property(e => e.ClassId)
                    .HasMaxLength(15)
                    .ValueGeneratedNever();

                entity.Property(e => e.ClassName).HasMaxLength(50);
            });

            modelBuilder.Entity<ClassForProduct>(entity =>
            {
                entity.HasKey(e => e.ClassId)
                    .HasName("PK__Class__CB1927A08E69D8C9");

                entity.Property(e => e.ClassId)
                    .HasColumnName("ClassID")
                    .HasMaxLength(15)
                    .ValueGeneratedNever();

                entity.Property(e => e.ClassDescription).HasMaxLength(254);

                entity.Property(e => e.ClassName).HasMaxLength(50);
            });

            modelBuilder.Entity<Customers>(entity =>
            {
                entity.HasKey(e => e.Cid)
                    .HasName("PK__Customer__C1F8DC390D3AE45F");

                entity.Property(e => e.Cid)
                    .HasColumnName("CId")
                    .HasMaxLength(15)
                    .ValueGeneratedNever();

                entity.Property(e => e.Ccity)
                    .HasColumnName("CCity")
                    .HasMaxLength(50);

                entity.Property(e => e.Cfax)
                    .HasColumnName("CFax")
                    .HasMaxLength(15);

                entity.Property(e => e.ClassId).HasMaxLength(15);

                entity.Property(e => e.Cname)
                    .IsRequired()
                    .HasColumnName("CName")
                    .HasMaxLength(15);

                entity.Property(e => e.Ctel)
                    .HasColumnName("CTel")
                    .HasMaxLength(15);
            });

            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.Pid)
                    .HasName("PK__Products__C5775540F79DF809");

                entity.Property(e => e.Pid)
                    .HasColumnName("PId")
                    .HasMaxLength(15)
                    .ValueGeneratedNever();

                entity.Property(e => e.BarCode).HasMaxLength(15);

                entity.Property(e => e.ClassId).HasMaxLength(15);

                entity.Property(e => e.Pname)
                    .IsRequired()
                    .HasColumnName("PName")
                    .HasMaxLength(25);

                entity.Property(e => e.Specification).HasMaxLength(15);

                entity.Property(e => e.Unit).HasMaxLength(15);
            });

            modelBuilder.Entity<Purchase>(entity =>
            {
                entity.HasKey(e => new { e.Spid, e.Sid })
                    .HasName("PK__tmp_ms_x__E891F4BC558ABD21");

                entity.Property(e => e.Spid)
                    .HasColumnName("SPId")
                    .HasMaxLength(25);

                entity.Property(e => e.Sid)
                    .HasColumnName("SId")
                    .HasMaxLength(15);

                entity.Property(e => e.Note).HasMaxLength(50);

                entity.Property(e => e.Pid)
                    .HasColumnName("PId")
                    .HasMaxLength(15);

                entity.Property(e => e.SpbeforeDate)
                    .HasColumnName("SPBeforeDate")
                    .HasColumnType("date");

                entity.Property(e => e.SpbeforePrice)
                    .HasColumnName("SPBeforePrice")
                    .HasColumnType("money");

                entity.Property(e => e.Specification).HasMaxLength(15);

                entity.Property(e => e.SplastDate)
                    .HasColumnName("SPLastDate")
                    .HasColumnType("date");

                entity.Property(e => e.Spname)
                    .IsRequired()
                    .HasColumnName("SPName")
                    .HasMaxLength(25);

                entity.Property(e => e.Spprice)
                    .HasColumnName("SPPrice")
                    .HasColumnType("money");

                entity.Property(e => e.Spunit)
                    .HasColumnName("SPUnit")
                    .HasMaxLength(15);
            });

            modelBuilder.Entity<Sell>(entity =>
            {
                entity.HasKey(e => new { e.Pid, e.Cid })
                    .HasName("PK__tmp_ms_x__4968D8833A66B5CA");

                entity.Property(e => e.Pid)
                    .HasColumnName("PId")
                    .HasMaxLength(15);

                entity.Property(e => e.Cid)
                    .HasColumnName("CId")
                    .HasMaxLength(15);

                entity.Property(e => e.SellPrice).HasColumnType("money");
            });

            modelBuilder.Entity<Suppliers>(entity =>
            {
                entity.HasKey(e => e.Sid)
                    .HasName("PK__Supplier__CA195950F2E5FA4D");

                entity.Property(e => e.Sid)
                    .HasColumnName("SId")
                    .HasMaxLength(15)
                    .ValueGeneratedNever();

                entity.Property(e => e.Scity)
                    .HasColumnName("SCity")
                    .HasMaxLength(50);

                entity.Property(e => e.Sfax)
                    .HasColumnName("SFax")
                    .HasMaxLength(15);

                entity.Property(e => e.Sname)
                    .IsRequired()
                    .HasColumnName("SName")
                    .HasMaxLength(25);

                entity.Property(e => e.Stel)
                    .HasColumnName("STel")
                    .HasMaxLength(15);
            });
        }
    }
}
