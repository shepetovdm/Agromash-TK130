using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace TK130.Pages
{
    /// <summary>
    /// Interaction logic for BasicPage1.xaml
    /// </summary>
    public partial class View3D : UserControl
    {
        public View3D()
        {
            InitializeComponent();
            string curDir = Directory.GetCurrentDirectory();
            wbViewer.Navigate(new Uri(String.Format("file:///{0}/Docs/1083869.htm", curDir)));
        }
    }
}
