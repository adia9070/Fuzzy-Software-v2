import wx
import eel
import pandas as pd
from io import StringIO

FILE1 = None
FILE2 = None
FILE3 = None
FILE4 = None

eel.init('web')

def read_df_from_json(data):
    return pd.read_json(data)

def read_df_from_csv(data):
    output = StringIO()
    output.write(data)
    output.seek(0)
    return pd.read_csv(output)

@eel.expose
def upload_file(order, filename, data):
    global FILE1, FILE2, FILE3, FILE4
    if order == 1 and filename.endswith(".csv"):
        FILE1 = read_df_from_csv(data)
    elif order == 1 and (filename.endswith(".xlsx") or filename.endswith(".xlsm")):
        FILE1 = read_df_from_json(data)
    elif order == 2 and filename.endswith(".csv"):
        FILE2 = read_df_from_csv(data)
    elif order == 2 and (filename.endswith(".xlsx") or filename.endswith(".xlsm")):
        FILE2 = read_df_from_json(data)
    elif order == 3 and filename.endswith(".csv"):
        FILE3 = read_df_from_csv(data)
    elif order == 3 and (filename.endswith(".xlsx") or filename.endswith(".xlsm")):
        FILE3 = read_df_from_json(data)
    elif order == 4 and filename.endswith(".csv"):
        FILE4 = read_df_from_csv(data)
    elif order == 4 and (filename.endswith(".xlsx") or filename.endswith(".xlsm")):
        FILE4 = read_df_from_json(data)
    return True
        

@eel.expose
def compute_work():    
    #Save it
    save_path = None
    app = wx.App(None)
    dialog = wx.DirDialog(None, "Choose Folder to Save the Output Files!", "", wx.DD_DEFAULT_STYLE | wx.DD_DIR_MUST_EXIST)
    if dialog.ShowModal() == wx.ID_OK:
        save_path = dialog.GetPath()
    dialog.Destroy()
    print(save_path)
    return True

eel.start("index.html", size=(1920,1080))