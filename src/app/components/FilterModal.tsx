import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FilterField } from "./tableComponents/tableheader/tableheader";
import { ColumnTypes } from "./tableComponents/models";
import { RangeSlider } from "rsuite";
import DatePicker from "react-datepicker";

type Props = {
  headfilterFields: FilterField[];
  showFilter: boolean;
  setshowFilter: React.Dispatch<any>;
  filterDataChange: React.Dispatch<any>;
};

const FilterModal = ({
  headfilterFields,
  showFilter,
  setshowFilter,
  filterDataChange,
}: Props) => {
  const [filterData, setfilterData] = useState<any>({});
  const COLUMN_TYPES = ColumnTypes;
  const [filterdate, setFilterDate] = useState("");

  function submitFilter() {
    filterDataChange(filterData);
    setfilterData({});
    setshowFilter(false);
    setFilterDate("");
  }

  function fieldValueChanged(ev: any, fieldName: any) {
    let innFDate = { ...filterData };
    innFDate[fieldName] = ev.target ? ev.target.value : ev;
    setfilterData(innFDate);
  }
  return (
    <Modal
      show={showFilter}
      onHide={() => setshowFilter(!showFilter)}
      keyboard={false}
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title>Filter By</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-10">
          {headfilterFields.length > 0 && (
            <form className="lg:self-start mb-8 w-full grid md:grid-cols-2 gap-6 font-medium">
              {headfilterFields.map((field, i) => (
                <div className="w-full">
                  {(field.type === COLUMN_TYPES.Text) && (
                      <div>
                        <label className="block mb-1 text-sm">
                          {field.title}
                        </label>
                        <input
                          type="text"
                          name=""
                          className="form-control bg-transparent font-medium"
                          placeholder={field.title}
                          onChange={(e) => fieldValueChanged(e, field.name)}
                          // className="text-[10px] font-medium w-full border border-[#C4CDD5] rounded-md focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    )}

                  {field.type === COLUMN_TYPES.List &&
                    field.listValue!?.length > 0 && (
                      <div>
                        <label className="block mb-1 text-sm">
                          {field.title}
                        </label>
                        <select
                          name=""
                          id=""
                          className="form-control bg-transparent font-medium"
                          onChange={(e) => fieldValueChanged(e, field.name)}
                          // className="bg-[#F2F5F9] w-full text-sm border-0 rounded-md focus:ring-1 focus:ring-primary"
                        >
                          <option value="" className="font-medium">
                            --Select {field.title}--
                          </option>
                          {field.listValue?.map((listv) => (
                            <option
                              value={listv[field.listIdField!]}
                              className="font-medium"
                            >
                              {listv[field.listTextField!]}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                  {field.type === COLUMN_TYPES.slider &&
                    field.listValue!.length < 1 &&
                    showFilter && (
                      <div>
                        <label className="block mb-1 text-sm justify-between">
                          <span>{field.title}</span>
                        </label>
                        <div className="w-full custom-slider font-medium">
                          <RangeSlider
                            max={50}
                            defaultValue={[
                              filterData[field!.sliderStartName!],
                              filterData[field!.sliderEndName!],
                            ]}
                            constraint={([start, end]) =>
                              start <= field?.sliderMin! &&
                              end >= field?.sliderMax!
                            }
                          />
                        </div>
                      </div>
                    )}
                  {field.type === COLUMN_TYPES.Date && (
                    <div>
                      <label className="block mb-1 text-sm">
                        {field.title}
                      </label>
                      <div className="w-full border font-medium border-[#C4CDD5] rounded-md focus:ring-1 focus:ring-primary flex justify-between">
                        <DatePicker
                          onChange={(date: any) => {
                            setFilterDate(
                              new Date(date).toISOString().split("T")[0]
                            );
                            fieldValueChanged(
                              new Date(date).toISOString().split("T")[0],
                              field.name
                            );
                          }}
                          value={filterdate}
                          placeholderText="Select Date"
                          className="form-control bg-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </form>
          )}

          <div className="lg:self-start w-full grid md:grid-cols-2 gap-x-6 gap-y-10">
            {headfilterFields.length > 0 && (
              <button
                type="button"
                onClick={() => submitFilter()}
                className="border border-solid hover:border-dotted bg-primary hover:bg-white border-purple-900 hover:text-primary text-white font-bold rounded flex items-center justify-center px-2 w-64 py-2"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FilterModal;
