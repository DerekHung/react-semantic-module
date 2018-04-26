'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = require('react-css-modules');

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _style = require('./style.css');

var _style2 = _interopRequireDefault(_style);

var _fileUpload = require('../../utils/fileUpload.js');

var _IDMaker = require('../../utils/IDMaker.js');

var _IDMaker2 = _interopRequireDefault(_IDMaker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof regeneratorRuntime === 'undefined') require('babel-polyfill');

var FileUploader = function (_Component) {
    _inherits(FileUploader, _Component);

    function FileUploader(props) {
        _classCallCheck(this, FileUploader);

        var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, props));

        _this.counter = 0;
        _this.fileList = {};

        var tagArrMap = {};
        for (var key in props.mediaInfo) {
            if (typeof tagArrMap[key] === 'undefined') tagArrMap[key] = [];
            for (var i in props.mediaInfo[key].multiAction) {
                tagArrMap[key].push(props.mediaInfo[key].multiAction[i].tag);
            }
        }
        _this.handleClick = function (e) {
            if (_this.props.onTriggerUpload) _this.props.onTriggerUpload(e);
            _this.refs.fileInput.click();
        };
        _this.cleanInput = function () {
            if (_this.refs.fileInput) _this.refs.fileInput.value = null;
        };

        _this.handleFileInput = function (e) {
            return _this._handleFileInput(e);
        };

        _this.logObject = function (object) {
            return Object.assign({}, object);
        };

        _this.generatorProcess = /*#__PURE__*/regeneratorRuntime.mark(function _callee(ID, signatureData) {
            var signature, uploadS3;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.fileList[ID]) {
                                _context.next = 20;
                                break;
                            }

                            _context.next = 3;
                            return (0, _fileUpload.getSignature)(this.fileList[ID].originFile, signatureData);

                        case 3:
                            signature = _context.sent;

                            this.fileList[ID].signature = signature;
                            this.fileList[ID].status = 'uploading';
                            //this.fileList[ID].snapTag = snap;
                            if (this.props.getSignatureDone) this.props.getSignatureDone(this.logObject(this.fileList[ID]));

                            _context.next = 9;
                            return (0, _fileUpload.uploadToS3)(this.fileList[ID].originFile, signature);

                        case 9:
                            uploadS3 = _context.sent;

                            this.fileList[ID].status = 'uploadDone';
                            if (this.props.uploadToS3Done) this.props.uploadToS3Done(this.logObject(this.fileList[ID]));

                            if (this.props.dontWaitSuccess) {
                                _context.next = 19;
                                break;
                            }

                            this.fileList[ID].status = 'transforming';
                            _context.next = 16;
                            return (0, _fileUpload.waitUrlSuccess)(signature.fileId, this.fileList[ID].type, tagArrMap[this.fileList[ID].type]);

                        case 16:
                            this.fileList[ID].transformedFile = _context.sent;

                            this.fileList[ID].status = 'transformDone';
                            if (this.props.urlTransformDone) this.props.urlTransformDone(this.logObject(this.fileList[ID]));

                        case 19:

                            this.cleanInput();

                        case 20:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        });

        _this.runGenerator = function (gen) {

            function go(result) {
                if (result.done) return;
                result.value.then(function (r) {
                    go(gen.next(r));
                });
            }
            go(gen.next());
        };
        return _this;
    }

    _createClass(FileUploader, [{
        key: '_handleFileInput',
        value: function _handleFileInput(e) {
            var _this2 = this;

            var files = Array.prototype.slice.call(e.target.files, 0);

            //let snap ='';
            var that = this;

            files.forEach(function (f) {

                var AtomicType = (0, _fileUpload.getAtomicType)(f.type);
                if (AtomicType) {

                    _this2._uploadProcess(AtomicType, f);
                }
            });
        }

        // _checkImageClientSize(AtomicType, f, _callback) {

        //     console.log(AtomicType);

        //     if(f.size > 9000000) {
        //         if(this.props.onBlockingUpload) this.props.onBlockingUpload('請選擇容量小於 10 MB的圖片');
        //         return false;
        //     }

        //     var reader = new FileReader();
        //     var img = new Image();

        //     reader.onload = function(e) {
        //         img.src = e.target.result;
        //     }

        //     img.onload = function() {
        //         console.log(this.width);
        //         console.log(this.height);
        //         if( this.width > 9999 || this.height > 9999){
        //             if(this.props.onBlockingUpload) this.props.onBlockingUpload('請選擇寬小於 9999 像素和高小於 9999 像素的圖片');
        //             return false;
        //         }
        //         _callback(AtomicType, f);
        //     }

        //     reader.readAsDataURL(f);
        // }

    }, {
        key: '_uploadProcess',
        value: function _uploadProcess(AtomicType, f) {
            var ID = (0, _IDMaker2.default)(3, this.counter);
            var signatureData = {
                apnum: this.props.apnum,
                pid: this.props.pid
            };
            this.counter++;

            this.fileList[ID] = {
                id: ID,
                type: AtomicType,
                originFile: f,
                status: 'initial',
                transformedFile: null
            };

            if (this.props.getFileInfo) this.props.getFileInfo(this.fileList[ID]);
            signatureData.extra = this.props.mediaInfo[AtomicType];
            var gen = this.generatorProcess(ID, signatureData);
            this.runGenerator(gen);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'span',
                { styleName: 'fileUpload', onClick: this.handleClick, className: this.props.className },
                this.props.children,
                _react2.default.createElement('input', { type: 'file', ref: 'fileInput', style: { display: 'none' },
                    onChange: this.handleFileInput })
            );
        }
    }]);

    return FileUploader;
}(_react.Component);

exports.default = (0, _reactCssModules2.default)(FileUploader, _style2.default);